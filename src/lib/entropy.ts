import { gaussian, mulberry32 } from './random.ts';
import { logGamma } from './pvalue.ts';

/** Box of width 2 and height 1, divided into 4 × 2 square cells. The partition sits at x = 1. */
export const BOX = { width: 2, height: 1, columns: 4, rows: 2 } as const;
export const CELLS = BOX.columns * BOX.rows;

export interface Gas { x: Float64Array; y: Float64Array; vx: Float64Array; vy: Float64Array; partition: boolean }

/** N non-interacting particles, uniformly spread over the left half, with Gaussian velocities. */
export function createGas(seed: number, n: number, speed = 0.35): Gas {
  const uniform = mulberry32(seed), normal = gaussian(mulberry32(seed ^ 0x5bd1e995));
  const gas: Gas = { x: new Float64Array(n), y: new Float64Array(n), vx: new Float64Array(n), vy: new Float64Array(n), partition: true };
  for (let i = 0; i < n; i++) {
    gas.x[i] = uniform() * BOX.width / 2;
    gas.y[i] = uniform() * BOX.height;
    gas.vx[i] = speed * normal();
    gas.vy[i] = speed * normal();
  }
  return gas;
}

/** Mirror a coordinate back into [low, high], flipping the velocity on each bounce. */
function reflect(position: number, velocity: number, low: number, high: number): [number, number] {
  while (position < low || position > high) {
    if (position < low) { position = 2 * low - position; velocity = -velocity; }
    if (position > high) { position = 2 * high - position; velocity = -velocity; }
  }
  return [position, velocity];
}

export function step(gas: Gas, dt: number) {
  const right = gas.partition ? BOX.width / 2 : BOX.width;
  for (let i = 0; i < gas.x.length; i++) {
    [gas.x[i], gas.vx[i]] = reflect(gas.x[i] + gas.vx[i] * dt, gas.vx[i], 0, right);
    [gas.y[i], gas.vy[i]] = reflect(gas.y[i] + gas.vy[i] * dt, gas.vy[i], 0, BOX.height);
  }
}

export function occupancy(gas: Gas) {
  const counts = new Array<number>(CELLS).fill(0);
  const size = BOX.width / BOX.columns;
  for (let i = 0; i < gas.x.length; i++) {
    const column = Math.min(BOX.columns - 1, Math.floor(gas.x[i] / size));
    const row = Math.min(BOX.rows - 1, Math.floor(gas.y[i] / size));
    counts[row * BOX.columns + column]++;
  }
  return counts;
}

/** ln W, with W = N! / (n₁! ⋯ n_C!): the number of ways to realize this cell occupancy. */
export function lnW(counts: readonly number[]) {
  const n = counts.reduce((a, b) => a + b, 0);
  return logGamma(n + 1) - counts.reduce((s, c) => s + logGamma(c + 1), 0);
}

/** The largest ln W for N particles: the most even split among the cells. */
export function maxLnW(n: number, cells = CELLS) {
  const q = Math.floor(n / cells), r = n % cells;
  return lnW([...Array<number>(r).fill(q + 1), ...Array<number>(cells - r).fill(q)]);
}

/** Probability that, at a given instant, all N particles are in the same half (either one). */
export const oneSideProbability = (n: number) => 2 * 0.5 ** n;

export function leftCount(gas: Gas) {
  let left = 0;
  for (let i = 0; i < gas.x.length; i++) if (gas.x[i] < BOX.width / 2) left++;
  return left;
}
