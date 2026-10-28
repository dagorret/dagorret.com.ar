import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';

const OUT_DIR = './src/content/blog';
fs.mkdirSync(OUT_DIR, { recursive: true });

function decodificarEntidades(str) {
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
    .replace(/&#8212;/g, '—');
}

async function testearPost112() {
  console.log("Descargando post 112 de WordPress...");
  const res = await fetch('https://dagorret.com.ar/wp-json/wp/v2/posts/112');
  const post = await res.json();
  let html = post.content.rendered;

  // 1. Extraer y validar EXCLUSIVAMENTE las fórmulas reales de WordPress: \[ ... \]
  const formulasDisplay = [...html.matchAll(/\\\[([\s\S]*?)\\\]/g)];
  const formulasInline = [...html.matchAll(/\\\(([\s\S]*?)\\\)/g)];

  console.log(`Fórmulas reales detectadas en WordPress: ${formulasDisplay.length} display, ${formulasInline.length} inline.`);

  let errores = 0;

  // Validar Display
  for (const m of formulasDisplay) {
    const raw = decodificarEntidades(m[1].trim());
    try {
      katex.renderToString(raw, { displayMode: true, throwOnError: true, strict: false });
      console.log(`  ✔ Display válida: ${raw.slice(0, 45)}...`);
    } catch (e) {
      console.error(`  ❌ Error en display: ${e.message}`);
      errores++;
    }
  }

  // Validar Inline
  for (const m of formulasInline) {
    const raw = decodificarEntidades(m[1].trim());
    try {
      katex.renderToString(raw, { displayMode: false, throwOnError: true, strict: false });
      console.log(`  ✔ Inline válida: ${raw.slice(0, 30)}...`);
    } catch (e) {
      console.error(`  ❌ Error en inline: ${e.message}`);
      errores++;
    }
  }

  if (errores === 0) {
    // 2. Si las fórmulas son 100% válidas, armar el Markdown limpio
    // Convertir las fórmulas reales a los delimitadores de Astro ($$ y $)
    html = html.replace(/(?:<p>)?\\\[([\s\S]*?)\\\](?:<\/p>)?/g, (_, f) => {
      return `\n\n$$\n${decodificarEntidades(f.trim())}\n$$\n\n`;
    });
    html = html.replace(/\\\(([\s\S]*?)\\\)/g, (_, f) => {
      return `$${decodificarEntidades(f.trim())}$`;
    });

    // Proteger bloques de código antes de convertir el HTML restante
    const codigos = [];
    html = html.replace(/<pre><code(?:\s+class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/gi, (_, lang, content) => {
      codigos.push(`\n\`\`\`${lang || ''}\n${decodificarEntidades(content).trim()}\n\`\`\`\n`);
      return `___BLOCK_CODE_${codigos.length - 1}___`;
    });
    html = html.replace(/<code>([\s\S]*?)<\/code>/gi, (_, content) => {
      codigos.push(`\`${decodificarEntidades(content)}\``);
      return `___INLINE_CODE_${codigos.length - 1}___`;
    });

    // Limpieza general de HTML a Markdown
    let md = html
      .replace(/<h2>(.*?)<\/h2>/g, '\n## $1\n')
      .replace(/<h3>(.*?)<\/h3>/g, '\n### $1\n')
      .replace(/<p>(.*?)<\/p>/gs, '\n$1\n')
      .replace(/<hr\s*\/?>/g, '\n---\n')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<a\s+href="([^"]+)">([\s\S]*?)<\/a>/g, '[$2]($1)')
      .replace(/<!--[\s\S]*?-->/g, '');

    // Restaurar el código protegido
    md = md.replace(/___BLOCK_CODE_(\d+)___/g, (_, i) => codigos[Number(i)]);
    md = md.replace(/___INLINE_CODE_(\d+)___/g, (_, i) => codigos[Number(i)]);
    md = decodificarEntidades(md).replace(/\n{3,}/g, '\n\n').trim();

    const destino = path.join(OUT_DIR, 'post-112.md');
    fs.writeFileSync(destino, `---\ntitle: "${decodificarEntidades(post.title.rendered).replace(/"/g, '\\"')}"\nslug: "${post.slug}"\n---\n\n${md}\n`);
    console.log(`\n🎉 ¡Post 112 migrado con éxito! Guardado en: ${destino}`);
  }
}

testearPost112();
