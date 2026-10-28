import fs from 'node:fs';
import katex from 'katex';

// Leemos la fórmula real directo desde el JSON en disco
const raw = JSON.parse(fs.readFileSync('./raw_posts/2026/el-caos-con-gramatica.json', 'utf-8'));
const html = raw.content_html;

// Extraemos los bloques display \[ ... \]
const matches = [...html.matchAll(/\\\[([\s\S]*?)\\\]/gi)];

function sanear(str) {
  return str
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-')
    .replace(/[–—]/g, '-')     // Guiones largos/cortos a signo menos
    .replace(/[’‘]/g, "'")     // Comillas tipográficas a simple
    .replace(/\\\\\*/g, '*')   // \\* a *
    .replace(/\\\*/g, '*')     // \* a *
    .trim();
}

console.log(`Encontradas ${matches.length} fórmulas display en 'el-caos-con-gramatica':\n`);

matches.forEach((m, idx) => {
  const limpia = sanear(m[1]);
  try {
    katex.renderToString(limpia, { displayMode: true, throwOnError: true });
    console.log(`✔ [Fórmula ${idx + 1}] Compiló OK: ${limpia.slice(0, 45)}...`);
  } catch (e) {
    console.log(`❌ [Fórmula ${idx + 1}] Error: ${e.message}`);
    console.log(`   Contenido: "${limpia}"\n`);
  }
});
