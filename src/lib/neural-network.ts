export type Activation = 'sigmoid' | 'relu';
export type Inputs = [number, number];
export interface Network {
  w1: number[][];
  b1: number[];
  w2: number[];
  b2: number;
}

export function initialNetwork(): Network {
  return { w1: [[0.8, -0.4], [-0.3, 0.9], [0.6, 0.5]], b1: [0.15, 0.2, 0.1], w2: [0.7, -0.6, 0.5], b2: -0.1 };
}

export function sigmoid(z: number) {
  return z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
}

export function forward(network: Network, inputs: Inputs, activation: Activation, target: number) {
  const hiddenZ = network.w1.map((weights, j) => weights[0] * inputs[0] + weights[1] * inputs[1] + network.b1[j]);
  const hidden = hiddenZ.map(z => activation === 'relu' ? Math.max(0, z) : sigmoid(z));
  const outputZ = hidden.reduce((sum, value, j) => sum + network.w2[j] * value, network.b2);
  const output = sigmoid(outputZ);
  return { hiddenZ, hidden, outputZ, output, loss: 0.5 * (output - target) ** 2 };
}

export function gradients(network: Network, inputs: Inputs, activation: Activation, target: number): Network {
  const pass = forward(network, inputs, activation, target);
  const outputDelta = (pass.output - target) * pass.output * (1 - pass.output);
  const hiddenDelta = pass.hidden.map((h, j) => outputDelta * network.w2[j]
    * (activation === 'relu' ? (pass.hiddenZ[j] > 0 ? 1 : 0) : h * (1 - h)));
  return {
    w1: hiddenDelta.map(delta => inputs.map(x => delta * x)),
    b1: hiddenDelta,
    w2: pass.hidden.map(h => outputDelta * h),
    b2: outputDelta,
  };
}

export function trainStep(network: Network, inputs: Inputs, activation: Activation, target: number, learningRate: number) {
  if (!Number.isFinite(learningRate) || learningRate <= 0) throw new Error('Learning rate must be positive.');
  const before = forward(network, inputs, activation, target);
  const gradient = gradients(network, inputs, activation, target);
  const norm = Math.hypot(...gradient.w1.flat(), ...gradient.b1, ...gradient.w2, gradient.b2);
  let rate = learningRate;
  // Backtracking evita aumentar la pérdida al cruzar un cambio de tramo de ReLU.
  if (Number.isFinite(norm) && norm > 1e-12) {
    for (let attempt = 0; attempt < 16; attempt++, rate *= 0.5) {
      const candidate: Network = {
        w1: network.w1.map((row, j) => row.map((w, i) => w - rate * gradient.w1[j][i])),
        b1: network.b1.map((b, j) => b - rate * gradient.b1[j]),
        w2: network.w2.map((w, j) => w - rate * gradient.w2[j]),
        b2: network.b2 - rate * gradient.b2,
      };
      const after = forward(candidate, inputs, activation, target);
      if (Number.isFinite(after.loss) && after.loss < before.loss) {
        return { network: candidate, before, after, rate, accepted: true };
      }
    }
  }
  return { network, before, after: before, rate: 0, accepted: false };
}

export function connections(network: Network, inputs: Inputs, pass: ReturnType<typeof forward>) {
  return [
    ...network.w1.flatMap((row, j) => row.map((weight, i) => ({ from: i, to: j + 2, weight, source: inputs[i], contribution: weight * inputs[i] }))),
    ...network.w2.map((weight, j) => ({ from: j + 2, to: 5, weight, source: pass.hidden[j], contribution: weight * pass.hidden[j] })),
  ];
}
