export const WORLD_START = 2024;
export const WORLD_END = 2100;
export const WORLD_INITIAL = 8.2; // Miles de millones; referencia ONU redondeada.
export const WORLD_MEDIUM_END = 10.2;
export const LOGISTIC_RATE = 0.035; // Parámetro didáctico, no una estimación ONU.
const decay = Math.exp(-LOGISTIC_RATE * (WORLD_END - WORLD_START));
export const MEDIUM_PLATEAU = WORLD_MEDIUM_END * (1 - decay) / (1 - WORLD_MEDIUM_END / WORLD_INITIAL * decay);

export function worldPopulation(offset: number) {
  if (!Number.isFinite(offset) || offset < -0.5 || offset > 0.5) throw new Error('Fertility offset must be within ±0.5.');
  // Sensibilidad ilustrativa elegida para el Lab; no reproduce las variantes oficiales.
  const plateau = MEDIUM_PLATEAU * Math.exp(0.75 * offset);
  const points = Array.from({ length: WORLD_END - WORLD_START + 1 }, (_, i) => ({
    year: WORLD_START + i,
    population: plateau / (1 + (plateau / WORLD_INITIAL - 1) * Math.exp(-LOGISTIC_RATE * i)),
  }));
  return { plateau, points, end: points.at(-1)!.population };
}

export function worldPath(offset: number) {
  return worldPopulation(offset).points.map((p, i) => `${i ? 'L' : 'M'}${(62 + i / 76 * 654).toFixed(2)},${(330 - p.population / 20 * 290).toFixed(2)}`).join(' ');
}

export const REPLACEMENT = 2.1;
// Supervivencia sintética por intervalo de cinco años, idéntica para los cuatro presets.
const survival = [0.995, 0.999, 0.999, 0.998, 0.997, 0.996, 0.995, 0.993, 0.99, 0.985, 0.975, 0.96, 0.935, 0.89, 0.81, 0.68, 0.48];
const fertilityWeights = [0.15, 0.3, 0.3, 0.2, 0.05]; // Grupos 20–24 a 40–44.
export const INITIAL_COHORTS = survival.reduce<number[]>((values, s) => [...values, values.at(-1)! * s], [100]);
const reproductiveBase = fertilityWeights.reduce((sum, weight, i) => sum + weight * INITIAL_COHORTS[i + 4], 0);

export function fertilityProjection(fertility: number, years: number) {
  if (!Number.isFinite(fertility) || fertility < 0 || fertility > 3.5) throw new Error('Fertility outside model range.');
  if (!Number.isInteger(years) || years < 0 || years > 100 || years % 5 !== 0) throw new Error('Horizon must be a five-year step up to 100.');
  let cohorts = [...INITIAL_COHORTS];
  for (let year = 0; year < years; year += 5) {
    const mothers = fertilityWeights.reduce((sum, weight, i) => sum + weight * cohorts[i + 4], 0);
    const births = 100 * fertility / REPLACEMENT * mothers / reproductiveBase;
    cohorts = [births, ...survival.map((s, i) => cohorts[i] * s)];
  }
  const total = cohorts.reduce((a, b) => a + b, 0);
  const initialTotal = INITIAL_COHORTS.reduce((a, b) => a + b, 0);
  return { cohorts, totalIndex: total / initialTotal * 100, olderShare: total ? cohorts.slice(13).reduce((a, b) => a + b, 0) / total * 100 : 0 };
}

export function pyramidBars(fertility: number, years: number) {
  const model = fertilityProjection(fertility, years);
  const max = Math.max(...model.cohorts, ...INITIAL_COHORTS);
  return { ...model, bars: model.cohorts.map((value, i) => ({ age: `${i * 5}–${i * 5 + 4}`, value, width: value / max * 270, initialWidth: INITIAL_COHORTS[i] / max * 270, y: 52 + (17 - i) * 23 })) };
}
