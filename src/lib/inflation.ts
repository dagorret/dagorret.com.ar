export interface InflationPoint {
  date: string;
  monthly: number | null;
  annual: number | null;
}
export type Metric = 'monthly' | 'annual';
export type Scale = 'linear' | 'log';

export function selectInflation(points: InflationPoint[], metric: Metric, recent: boolean) {
  const period = recent ? points.slice(-60) : points;
  return period.filter(p =>
    p[metric] !== null && Number.isFinite(p[metric]));
}

export function inflationGeometry(points: InflationPoint[], metric: Metric, scale: Scale, width: number, height: number) {
  const values = points.map(p => p[metric]).filter((v): v is number => v !== null && Number.isFinite(v));
  if (!values.length) throw new Error('No observations for this period.');
  if (scale === 'log' && values.some(v => v <= 0)) throw new Error('Logarithmic scale requires positive rates.');
  const left = 62, right = width - 22, top = 24, bottom = height - 48;
  const min = scale === 'log' ? 10 ** Math.floor(Math.log10(Math.min(...values))) : 0;
  const rough = Math.max(...values) / 5;
  const magnitude = 10 ** Math.floor(Math.log10(rough || 1));
  const step = ([1, 2, 5, 10].find(n => n * magnitude >= rough) ?? 10) * magnitude;
  const max = scale === 'log' ? 10 ** Math.ceil(Math.log10(Math.max(...values))) : Math.ceil(Math.max(...values) / step) * step;
  const upper = max === min ? max * 10 : max;
  const transform = (v: number) => scale === 'log' ? Math.log10(v) : v;
  const x = (i: number) => left + i / Math.max(1, points.length - 1) * (right - left);
  const y = (v: number) => bottom - (transform(v) - transform(min)) / (transform(upper) - transform(min)) * (bottom - top);
  const ticks: number[] = [];
  if (scale === 'log') {
    for (let power = Math.floor(Math.log10(min)); power <= Math.ceil(Math.log10(upper)); power++) {
      for (const multiplier of [1, 2, 5]) {
        const value = multiplier * 10 ** power;
        if (value >= min && value <= upper) ticks.push(value);
      }
    }
  } else {
    for (let value = 0; value <= upper + step / 100; value += step) ticks.push(value);
  }
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(2)},${y(p[metric]!).toFixed(2)}`).join(' ');
  return { x, y, left, right, top, bottom, ticks, path };
}
