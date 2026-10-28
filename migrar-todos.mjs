import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';

const BASE_URL = 'https://dagorret.com.ar/wp-json/wp/v2/posts';
const OUT_DIR = './src/content/blog';
fs.mkdirSync(OUT_DIR, { recursive: true });

function decodificarEntidades(str) {
  if (!str) return '';
  return str
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&quot;/g, '"');
}

function convertirPost(post) {
  let html = post.content.rendered;
  const errores = [];

  // 1. Extraer y validar fórmulas reales de WP
  const formulasDisplay = [...html.matchAll(/\\\[([\s\S]*?)\\\]/g)];
  const formulasInline = [...html.matchAll(/\\\(([\s\S]*?)\\\)/g)];

  for (const m of formulasDisplay) {
    const raw = decodificarEntidades(m[1].trim());
    try {
      katex.renderToString(raw, { displayMode: true, throwOnError: true, strict: false });
    } catch (e) {
      errores.push(`[Display]: ${e.message} en: "${raw.slice(0, 30)}..."`);
    }
  }

  for (const m of formulasInline) {
    const raw = decodificarEntidades(m[1].trim());
    try {
      katex.renderToString(raw, { displayMode: false, throwOnError: true, strict: false });
    } catch (e) {
      errores.push(`[Inline]: ${e.message} en: "${raw.slice(0, 30)}..."`);
    }
  }

  // 2. Transformar delimitadores matemáticos
  html = html.replace(/(?:<p>)?\\\[([\s\S]*?)\\\](?:<\/p>)?/g, (_, f) => {
    return `\n\n$$\n${decodificarEntidades(f.trim())}\n$$\n\n`;
  });
  html = html.replace(/\\\(([\s\S]*?)\\\)/g, (_, f) => {
    return `$${decodificarEntidades(f.trim())}$`;
  });

  // 3. Proteger bloques y fragmentos de código
  const codigos = [];
  html = html.replace(/<pre><code(?:\s+class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/gi, (_, lang, content) => {
    codigos.push(`\n\`\`\`${lang || ''}\n${decodificarEntidades(content).trim()}\n\`\`\`\n`);
    return `___BLOCK_CODE_${codigos.length - 1}___`;
  });
  html = html.replace(/<code>([\s\S]*?)<\/code>/gi, (_, content) => {
    codigos.push(`\`${decodificarEntidades(content)}\``);
    return `___INLINE_CODE_${codigos.length - 1}___`;
  });

  // 4. Transformar estructura HTML a Markdown
  let md = html
    .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, (m, c) => `\n## ${c}\n`)
    .replace(/<p>(.*?)<\/p>/gs, '\n$1\n')
    .replace(/<hr\s*\/?>/g, '\n---\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/<a\s+href="([^"]+)">([\s\S]*?)<\/a>/g, '[$2]($1)')
    .replace(/<!--[\s\S]*?-->/g, '');

  // 5. Restaurar código
  md = md.replace(/___BLOCK_CODE_(\d+)___/g, (_, i) => codigos[Number(i)]);
  md = md.replace(/___INLINE_CODE_(\d+)___/g, (_, i) => codigos[Number(i)]);
  md = decodificarEntidades(md).replace(/\n{3,}/g, '\n\n').trim();

  const fecha = post.date.split('T')[0];
  const titulo = decodificarEntidades(post.title.rendered).replace(/"/g, '\\"');
  const slug = post.slug;

  const frontmatter = `---
title: "${titulo}"
date: ${fecha}
slug: "${slug}"
---

${md}
`;

  return { frontmatter, slug, fecha, errores, totalMath: formulasDisplay.length + formulasInline.length };
}

async function migrarTodo() {
  let page = 1;
  let procesados = 0;
  let correctos = 0;
  const fallidos = [];

  console.log("Iniciando migración y auditoría de 152 posts...\n");

  while (true) {
    const res = await fetch(`${BASE_URL}?per_page=100&page=${page}`);
    if (!res.ok) break;

    const posts = await res.json();
    if (!posts.length) break;

    for (const post of posts) {
      procesados++;
      const resultado = convertirPost(post);
      const nombreArchivo = `${resultado.fecha}-${resultado.slug}.md`;
      const rutaDestino = path.join(OUT_DIR, nombreArchivo);

      fs.writeFileSync(rutaDestino, resultado.frontmatter);

      if (resultado.errores.length === 0) {
        correctos++;
        const detalleMath = resultado.totalMath > 0 ? ` (📐 ${resultado.totalMath} fórmulas OK)` : '';
        console.log(`[${procesados}/152] ✔ ${resultado.slug}${detalleMath}`);
      } else {
        fallidos.push({ slug: resultado.slug, errores: resultado.errores });
        console.log(`[${procesados}/152] ⚠ ${resultado.slug} (Guardado con advertencias en math)`);
      }
    }
    page++;
  }

  console.log(`\n========================================`);
  console.log(`Migración finalizada:`);
  console.log(`  Procesados: ${procesados}`);
  console.log(`  100% Limpios: ${correctos}`);
  console.log(`  Con advertencias: ${fallidos.length}`);
  console.log(`========================================`);

  if (fallidos.length > 0) {
    console.log("\nDetalle de posts para revisar manualmente:");
    fallidos.forEach(f => {
      console.log(`\n- ${f.slug}:`);
      f.errores.forEach(e => console.log(`   ${e}`));
    });
  }
}

migrarTodo();
