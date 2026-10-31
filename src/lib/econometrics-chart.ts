import type { Point } from './econometrics';

const NS = 'http://www.w3.org/2000/svg';
let chartId = 0;
export const plot = { left: 76, right: 696, top: 24, bottom: 352, width: 740, height: 410 };
export function svgNode(tag: string, attributes: Record<string, string | number> = {}, text?: string) {
  const node = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  if (text !== undefined) node.textContent = text;
  return node;
}

export function chart(svg: SVGSVGElement, xDomain: [number, number], yDomain: [number, number], labels: [string, string], locale: string) {
  svg.replaceChildren();
  const x = (v: number) => plot.left + (v - xDomain[0]) / (xDomain[1] - xDomain[0]) * (plot.right - plot.left);
  const y = (v: number) => plot.bottom - (v - yDomain[0]) / (yDomain[1] - yDomain[0]) * (plot.bottom - plot.top);
  const fmt = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  for (let i = 0; i <= 5; i++) {
    const xv = xDomain[0] + (xDomain[1] - xDomain[0]) * i / 5;
    const yv = yDomain[0] + (yDomain[1] - yDomain[0]) * i / 5;
    svg.append(svgNode('line', { x1: x(xv), x2: x(xv), y1: plot.top, y2: plot.bottom, class: 'econ-grid' }));
    svg.append(svgNode('line', { x1: plot.left, x2: plot.right, y1: y(yv), y2: y(yv), class: 'econ-grid' }));
    svg.append(svgNode('text', { x: x(xv), y: plot.bottom + 22, 'text-anchor': 'middle', class: 'econ-tick' }, fmt.format(xv)));
    svg.append(svgNode('text', { x: plot.left - 9, y: y(yv) + 4, 'text-anchor': 'end', class: 'econ-tick' }, fmt.format(yv)));
  }
  svg.append(svgNode('text', { x: (plot.left + plot.right) / 2, y: 401, 'text-anchor': 'middle', class: 'econ-axis' }, labels[0]));
  svg.append(svgNode('text', { transform: 'translate(16 188) rotate(-90)', 'text-anchor': 'middle', class: 'econ-axis' }, labels[1]));
  const id = `econ-clip-${++chartId}`;
  const defs = svgNode('defs');
  const clip = svgNode('clipPath', { id });
  clip.append(svgNode('rect', { x: plot.left, y: plot.top, width: plot.right - plot.left, height: plot.bottom - plot.top }));
  defs.append(clip); svg.append(defs);
  const viewport = svgNode('g', { 'clip-path': `url(#${id})` });
  svg.append(viewport);
  return { x, y, layer: viewport };
}

export function drawPath(layer: SVGElement, points: readonly Point[], x: (v: number) => number, y: (v: number) => number, className = 'econ-line') {
  layer.append(svgNode('path', { d: points.map((p, i) => `${i ? 'L' : 'M'}${x(p.x).toFixed(2)},${y(p.y).toFixed(2)}`).join(' '), class: className }));
}

export function extent(values: readonly number[], minimumPadding = 1): [number, number] {
  const min = Math.min(...values), max = Math.max(...values);
  const padding = Math.max(minimumPadding, (max - min) * 0.12);
  return [min - padding, max + padding];
}

export function numberFormatter(lang: string) {
  const formatter = new Intl.NumberFormat(lang, { maximumFractionDigits: 3 });
  return (value: number | null | undefined) => value == null || !Number.isFinite(value) ? '—' : formatter.format(value);
}
