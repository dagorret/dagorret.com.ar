import { gaussian, mulberry32 } from './random.ts';

const LANCZOS = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

export function logGamma(x: number): number {
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  x -= 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += LANCZOS[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

/** Continued fraction for the incomplete beta function (modified Lentz). */
function betaFraction(a: number, b: number, x: number) {
  const tiny = 1e-300;
  let c = 1, d = 1 - (a + b) * x / (a + 1);
  if (Math.abs(d) < tiny) d = tiny;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c; if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (a + b + m) * x / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d; if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c; if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-14) break;
  }
  return h;
}

/** Regularized incomplete beta I_x(a, b). */
export function incompleteBeta(x: number, a: number, b: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const front = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? front * betaFraction(a, b, x) / a : 1 - front * betaFraction(b, a, 1 - x) / b;
}

/** Two-sided p-value of a Student t statistic with df degrees of freedom. */
export function twoSidedP(t: number, df: number) {
  if (!Number.isFinite(t)) return Number.isNaN(t) ? NaN : 0;
  return incompleteBeta(df / (df + t * t), df / 2, 0.5);
}

export const MAX_OUTCOMES = 20;

export interface Simulation { studies: number; n: number; outcomes: number; p: Float64Array }

/**
 * k studies with two groups of n subjects each and no true effect.
 * Each subject has `outcomes` measured variables with pairwise correlation rho
 * (shared factor). Every outcome is compared with a pooled-variance t test.
 */
export function simulateStudies(seed: number, studies: number, n: number, rho = 0, outcomes = MAX_OUTCOMES): Simulation {
  const normal = gaussian(mulberry32(seed));
  const shared = Math.sqrt(rho), own = Math.sqrt(1 - rho);
  const p = new Float64Array(studies * outcomes);
  const sum = new Float64Array(2 * outcomes), squares = new Float64Array(2 * outcomes);
  const df = 2 * n - 2;
  for (let s = 0; s < studies; s++) {
    sum.fill(0); squares.fill(0);
    for (let group = 0; group < 2; group++) {
      for (let i = 0; i < n; i++) {
        const factor = normal();
        for (let j = 0; j < outcomes; j++) {
          const value = shared * factor + own * normal();
          sum[group * outcomes + j] += value;
          squares[group * outcomes + j] += value * value;
        }
      }
    }
    for (let j = 0; j < outcomes; j++) {
      const meanA = sum[j] / n, meanB = sum[outcomes + j] / n;
      const ssA = squares[j] - n * meanA * meanA, ssB = squares[outcomes + j] - n * meanB * meanB;
      const pooled = (ssA + ssB) / df;
      p[s * outcomes + j] = twoSidedP((meanA - meanB) / Math.sqrt(pooled * 2 / n), df);
    }
  }
  return { studies, n, outcomes, p };
}

/**
 * The p-value each study reports when it tries the first m outcomes and keeps the best one.
 * With Bonferroni, the reported value is the adjusted min(1, m · p_min), compared with alpha.
 */
export function reportedP(sim: Simulation, m: number, bonferroni: boolean) {
  const reported = new Float64Array(sim.studies);
  for (let s = 0; s < sim.studies; s++) {
    let best = 1;
    for (let j = 0; j < m; j++) best = Math.min(best, sim.p[s * sim.outcomes + j]);
    reported[s] = bonferroni ? Math.min(1, m * best) : best;
  }
  return reported;
}

export function falsePositiveRate(reported: ArrayLike<number>, alpha = 0.05) {
  let hits = 0;
  for (let i = 0; i < reported.length; i++) if (reported[i] < alpha) hits++;
  return hits / reported.length;
}

/** Family-wise error rate with m independent tests, with or without Bonferroni. */
export function theoreticalRate(m: number, bonferroni: boolean, alpha = 0.05) {
  return 1 - (1 - (bonferroni ? alpha / m : alpha)) ** m;
}

export function histogram(values: ArrayLike<number>, bins = 20) {
  const counts = new Array<number>(bins).fill(0);
  for (let i = 0; i < values.length; i++) counts[Math.min(bins - 1, Math.floor(values[i] * bins))]++;
  return counts;
}
