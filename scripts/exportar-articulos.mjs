// Exporta artículos, categorías, hasta 5 etiquetas y una descripción propuesta a CSV.
// Solo lectura: no modifica ningún archivo del proyecto.
// Uso (desde la raíz del repo): node exportar-articulos.mjs [salida.csv]
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const RAIZ = 'src/content/blog';
const SALIDA = process.argv[2] || 'articulos.csv';

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : /\.mdx?$/.test(n) ? [p] : [];
  });
}

const limpia = (s) => s.trim().replace(/^["']|["']$/g, '').replace(/\\"/g, '"').trim();

function lista(fm, campo) {
  const lineas = fm.split('\n');
  const i = lineas.findIndex((l) => new RegExp(`^${campo}\\s*:`).test(l));
  if (i < 0) return [];
  const resto = lineas[i].replace(new RegExp(`^${campo}\\s*:`), '').trim();
  if (resto.startsWith('[')) {
    return resto.replace(/^\[|\]$/g, '').split(',').map(limpia).filter(Boolean);
  }
  if (resto) return [limpia(resto)];
  const out = [];
  for (let j = i + 1; j < lineas.length; j++) {
    const m = lineas[j].match(/^\s*-\s+(.*)$/);
    if (!m) break;
    out.push(limpia(m[1]));
  }
  return out.filter(Boolean);
}

function escalar(fm, campo) {
  const m = fm.match(new RegExp(`^${campo}\\s*:\\s*(.*)$`, 'm'));
  return m ? limpia(m[1]) : '';
}

function descripcion(cuerpo) {
  const parrafos = cuerpo.split(/\n\s*\n/).map((p) => p.trim());
  const p = parrafos.find(
    (x) => x && !/^(#|>|!\[|<|---|```|\$\$|\||[-*]\s|\d+\.\s|import\s|export\s)/.test(x)
  );
  if (!p) return '';
  let t = p
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const f = t.match(/^.*?[.!?¿?](?=\s|$)/);
  let s = f ? f[0] : t;
  if (s.length > 155) s = s.slice(0, 154).replace(/\s+\S*$/, '') + '…';
  return s;
}

const csv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const cab = ['archivo','idioma','titulo','fecha','categorias','etiqueta1','etiqueta2','etiqueta3','etiqueta4','etiqueta5','n_etiquetas','descripcion_propuesta'];
const filas = [cab.map(csv).join(';')];

for (const f of archivos(RAIZ).sort()) {
  const txt = readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) continue;
  const [, fm, cuerpo] = m;
  const tags = lista(fm, 'tags');
  const fila = [
    relative(RAIZ, f),
    escalar(fm, 'lang'),
    escalar(fm, 'title'),
    escalar(fm, 'date'),
    lista(fm, 'categories').join(', '),
    ...Array.from({ length: 5 }, (_, i) => tags[i] ?? ''),
    tags.length,
    escalar(fm, 'description') || descripcion(cuerpo),
  ];
  filas.push(fila.map(csv).join(';'));
}

writeFileSync(SALIDA, '﻿' + filas.join('\r\n') + '\r\n', 'utf8');
console.log(`Listo: ${filas.length - 1} artículos en ${SALIDA}`);
