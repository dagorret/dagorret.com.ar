import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import TurndownService from 'turndown';

const RAW_DIR = './raw_posts';
const OUT_DIR = './src/content/blog';

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

turndown.addRule('fencedCodeBlock', {
  filter: (node) => node.nodeName === 'PRE' && node.querySelector('code'),
  replacement: (content, node) => {
    const code = node.querySelector('code');
    const className = code.getAttribute('class') || '';
    const match = className.match(/language-(\S+)/);
    const lang = match ? match[1] : '';
    return `\n\n\`\`\`${lang}\n${code.textContent.trim()}\n\`\`\`\n\n`;
  }
});

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
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-')
    .replace(/&quot;/g, '"');
}

function sanearMathWP(formula) {
  return decodificarEntidades(formula)
    .replace(/\\\\\*/g, '*')
    .replace(/\\\*/g, '*')
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, '-')
    .trim();
}

function procesarPost(rawPost) {
  let html = rawPost.content_html || '';
  const advertencias = [];

  const displayTokens = [];
  html = html.replace(/(?:<p[^>]*>)?\\\[([\s\S]*?)\\\](?:<\/p>)?/gi, (_, f) => {
    const limpia = sanearMathWP(f);
    try {
      katex.renderToString(limpia, { displayMode: true, throwOnError: true, strict: false });
    } catch (e) {
      advertencias.push(`[Display Math]: ${e.message} en "${limpia.slice(0, 30)}..."`);
    }
    displayTokens.push(`\n\n$$\n${limpia}\n$$`);
    return `KATEXDISPLAYTOKEN${displayTokens.length - 1}XYZ`;
  });

  const inlineTokens = [];
  html = html.replace(/\\\(([\s\S]*?)\\\)/gi, (_, f) => {
    const limpia = sanearMathWP(f);
    try {
      katex.renderToString(limpia, { displayMode: false, throwOnError: true, strict: false });
    } catch (e) {
      advertencias.push(`[Inline Math]: ${e.message} en "${limpia.slice(0, 30)}..."`);
    }
    inlineTokens.push(`$${limpia}$`);
    return `KATEXINLINETOKEN${inlineTokens.length - 1}XYZ`;
  });

  let md = turndown.turndown(html);

  // Restaurar los tokens (sin guiones bajos para evitar escapes involuntarios de Markdown)
  md = md.replace(/KATEXDISPLAYTOKEN(\d+)XYZ/g, (_, i) => displayTokens[Number(i)]);
  md = md.replace(/KATEXINLINETOKEN(\d+)XYZ/g, (_, i) => inlineTokens[Number(i)]);
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  const titulo = decodificarEntidades(rawPost.title).replace(/"/g, '\\"');
  const frontmatter = [
    '---',
    `title: "${titulo}"`,
    `date: ${rawPost.date}`,
    `slug: "${rawPost.slug}"`,
    `lang: "${rawPost.lang || 'es'}"`,
    `categories: ${JSON.stringify(rawPost.categories || [])}`,
    `tags: ${JSON.stringify(rawPost.tags || [])}`,
    '---',
    '',
    md,
    ''
  ].join('\n');

  return { frontmatter, advertencias };
}

function ejecutar() {
  const anios = fs.readdirSync(RAW_DIR).filter(d => fs.statSync(path.join(RAW_DIR, d)).isDirectory());
  let countEs = 0;
  let countEn = 0;

  for (const anio of anios) {
    const dirAnio = path.join(RAW_DIR, anio);
    const archivos = fs.readdirSync(dirAnio).filter(f => f.endsWith('.json'));

    for (const archivo of archivos) {
      const raw = JSON.parse(fs.readFileSync(path.join(dirAnio, archivo), 'utf-8'));
      const lang = raw.lang || 'es';

      const destFolder = path.join(OUT_DIR, lang, anio);
      fs.mkdirSync(destFolder, { recursive: true });

      const { frontmatter } = procesarPost(raw);
      fs.writeFileSync(path.join(destFolder, `${raw.slug}.md`), frontmatter);

      if (lang === 'en') countEn++;
      else countEs++;
    }
  }

  console.log(`✔ Regenerados ${countEs + countEn} posts con KaTeX restaurado.`);
}

ejecutar();
