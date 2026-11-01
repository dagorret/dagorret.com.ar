/** Seeded uniform generator (mulberry32): the same seed always yields the same draws. */
export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** Standard normal draws by Box–Muller, using both values of each pair. */
export function gaussian(uniform: () => number) {
  let spare: number | null = null;
  return () => {
    if (spare !== null) { const value = spare; spare = null; return value; }
    const radius = Math.sqrt(-2 * Math.log(Math.max(uniform(), 1e-12)));
    const angle = 2 * Math.PI * uniform();
    spare = radius * Math.sin(angle);
    return radius * Math.cos(angle);
  };
}

/** Next seed in a reproducible sequence (golden-ratio increment, as in the existing labs). */
export const nextSeed = (seed: number) => (seed + 0x9E3779B9) >>> 0;
