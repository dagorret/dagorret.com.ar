export interface Point { x: number; y: number }

export function ols(points: readonly Point[]) {
  const n = points.length;
  if (n < 2) return null;
  const meanX = points.reduce((s, p) => s + p.x, 0) / n;
  const meanY = points.reduce((s, p) => s + p.y, 0) / n;
  const sxx = points.reduce((s, p) => s + (p.x - meanX) ** 2, 0);
  if (sxx < 1e-12) return null;
  const sxy = points.reduce((s, p) => s + (p.x - meanX) * (p.y - meanY), 0);
  const slope = sxy / sxx;
  const intercept = meanY - slope * meanX;
  const residuals = points.map(p => p.y - intercept - slope * p.x);
  const ssr = residuals.reduce((s, e) => s + e * e, 0);
  const sst = points.reduce((s, p) => s + (p.y - meanY) ** 2, 0);
  const r2 = sst > 1e-12 ? Math.max(0, Math.min(1, 1 - ssr / sst)) : null;
  const se = n > 2 ? Math.sqrt(ssr / (n - 2)) : null;
  const dw = ssr > 1e-12
    ? residuals.slice(1).reduce((s, e, i) => s + (e - residuals[i]) ** 2, 0) / ssr : null;
  return { n, meanX, meanY, sxx, intercept, slope, residuals, ssr, sst, r2, se, dw };
}

export function lineSsr(points: readonly Point[], intercept: number, slope: number) {
  return points.reduce((sum, point) => sum + (point.y - intercept - slope * point.x) ** 2, 0);
}

/** A narrow x range makes the contrast between residual size and leverage visible. */
export function olsExample(): Point[] {
  const xs = [8, 8.4, 8.8, 9.2, 9.6, 10, 10.4, 10.8, 11.2, 11.6, 12, 10];
  const noise = [-2, 1, -1, 2, -1, 0, -2, 2, -1, 1, 1, 0];
  return xs.map((x, i) => ({ x, y: 20 + 2 * x + noise[i] }));
}

export function olsWitness(points: readonly Point[], kind: 'vertical' | 'leverage') {
  const before = ols(points);
  if (!before || points.length >= 250) return null;
  const x = kind === 'vertical' ? before.meanX : before.meanX <= 10 ? 20 : 0;
  const predicted = before.intercept + before.slope * x;
  const y = kind === 'vertical'
    ? (before.meanY <= 50 ? 100 : 0)
    : Math.max(0, Math.min(100, predicted + (predicted <= 85 ? 15 : -15)));
  const point = { x, y };
  const after = ols([...points, point]);
  if (!after) return null;
  return {
    kind, point, before, after,
    residualBefore: y - predicted,
    residualAfter: y - after.intercept - after.slope * x,
    leverage: 1 / after.n + (x - after.meanX) ** 2 / after.sxx,
    slopeChange: after.slope - before.slope,
  };
}

/** Seeded Gaussian innovations: reproducible draws, with separate streams per series. */
export function innovations(seed: number, n = 250) {
  let state = seed >>> 0;
  const uniform = () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  return Array.from({ length: n }, () => Math.sqrt(-2 * Math.log(Math.max(uniform(), 1e-12))) * Math.cos(2 * Math.PI * uniform()));
}

export function ar1(rho: number, noise: readonly number[], c = 0) {
  let previous = 0;
  return noise.map(e => previous = c + rho * previous + e);
}

export function arVariance(rho: number, t: number) {
  return Math.abs(rho) === 1 ? t : (1 - rho ** (2 * t)) / (1 - rho * rho);
}

export function omittedSample(rho: number) {
  const n = 90;
  const z = Array.from({ length: n }, (_, i) => (Math.floor(i / 30) - 1) * Math.sqrt(1.5));
  const raw = Array.from({ length: n }, (_, i) => i % 30 - 14.5);
  const sd = Math.sqrt(raw.reduce((s, v) => s + v * v, 0) / n);
  const v = raw.map(value => value / sd);
  const x = z.map((value, i) => 12 + 3 * (rho * value + Math.sqrt(1 - rho * rho) * v[i]));
  // Orthogonalize a deterministic disturbance so the finite-sample decomposition is exact.
  let noise = Array.from({ length: n }, (_, i) => Math.sin(i * 2.39));
  const mean = noise.reduce((a, b) => a + b, 0) / n;
  noise = noise.map(e => e - mean);
  for (const vector of [z, v]) {
    const projection = noise.reduce((s, e, i) => s + e * vector[i], 0) / n;
    noise = noise.map((e, i) => e - projection * vector[i]);
  }
  const points = x.map((value, i) => ({ x: value, z: z[i], y: 10 + 2 * value + 8 * z[i] + 2 * noise[i], group: Math.floor(i / 30) }));
  const simple = ols(points)!;
  const covXZ = points.reduce((s, p) => s + (p.x - simple.meanX) * p.z, 0) / n;
  const varX = points.reduce((s, p) => s + (p.x - simple.meanX) ** 2, 0) / n;
  const covZY = points.reduce((s, p) => s + p.z * (p.y - simple.meanY), 0) / n;
  const covXY = points.reduce((s, p) => s + (p.x - simple.meanX) * (p.y - simple.meanY), 0) / n;
  const determinant = varX - covXZ * covXZ; // Var(z) = 1
  const beta1 = (covXY - covXZ * covZY) / determinant;
  const beta2 = (varX * covZY - covXZ * covXY) / determinant;
  const beta0 = simple.meanY - beta1 * simple.meanX;
  return { points, simple, covXZ, varX, correlation: covXZ / Math.sqrt(varX), beta0, beta1, beta2, bias: beta2 * covXZ / varX };
}
