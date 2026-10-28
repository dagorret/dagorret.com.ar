const fs = require("fs");
const path = require("path");
const https = require("https");

const outDir = path.join(process.cwd(), "src/content/blog/en/2026");
const imgDir = path.join(process.cwd(), "public/images");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "AstroMigration/1.0" } }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on("error", reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest)) return resolve(true);
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(true); });
      } else {
        resolve(false);
      }
    }).on("error", () => resolve(false));
  });
}

(async () => {
  console.log("Conectando a WordPress API...");
  let allPosts = [];
  for (let page = 1; page <= 4; page++) {
    const batch = await fetchJSON(`https://dagorret.com.ar/wp-json/wp/v2/posts?per_page=50&page=${page}`);
    if (batch && Array.isArray(batch) && batch.length > 0) {
      allPosts = allPosts.concat(batch);
    } else {
      break;
    }
  }

  console.log(`Total posts obtenidos: ${allPosts.length}`);

  const englishSlugs = [
    "memory-that-outlives-its-owner",
    "ptolemy-from-below",
    "quantum-enlightenment",
    "the-ai-shed-factory-and-researcha",
    "the-bonhoeffer-we-quote-and-the-one-who-actually-wrote",
    "the-collision-of-two-scales-hazard-erosion-and-disaster",
    "the-guardians-law-biology-cannot-be-delegated",
    "the-philosophy-engineers-do-without-calling-it-that",
    "the-shape-of-the-probable-in-formulas",
    "the-shape-of-the-probable",
    "the-shape-of-the-probable-without-formulas",
    "the-stupidity-factory-in-2026",
    "the-taxonomy-of-ignorance-rational-decision-between-computable-risk-and-radical-uncertainty",
    "what-philosophers-do-in-ai"
  ];

  let restored = 0;

  for (const post of allPosts) {
    if (!englishSlugs.includes(post.slug)) continue;

    console.log(`-> Procesando: ${post.slug}`);
    let content = post.content.rendered;

    // Descargar imagenes
    const imgMatches = [...content.matchAll(/src=["'](https?:\/\/dagorret\.com\.ar\/wp-content\/uploads\/[^\s"']+)["']/g)];
    for (const m of imgMatches) {
      const imgUrl = m[1];
      const filename = path.basename(new URL(imgUrl).pathname);
      const dest = path.join(imgDir, filename);
      await downloadImage(imgUrl, dest);
      content = content.split(imgUrl).join(`/images/${filename}`);
    }

    // Conversion a Markdown limpio
    let md = content
      .replace(/<figure[^>]*>/g, "")
      .replace(/<\/figure>/g, "")
      .replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/g, "")
      .replace(/<p>/g, "\n\n")
      .replace(/<\/p>/g, "")
      .replace(/<h2[^>]*>(.*?)<\/h2>/g, "\n\n## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/g, "\n\n### $1\n\n")
      .replace(/<strong[^>]*>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/g, "*$1*")
      .replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/g, "\n\n![$2]($1)\n\n")
      .replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>/g, "\n\n![$1]($2)\n\n")
      .replace(/&#8220;|&#8221;/g, "\"")
      .replace(/&#8216;|&#8217;/g, "'")
      .replace(/&#8212;/g, "—")
      .replace(/\n{3,}/g, "\n\n");

    const title = post.title.rendered
      .replace(/&#8220;|&#8221;/g, "\"")
      .replace(/&#8216;|&#8217;/g, "'")
      .replace(/&#8212;/g, "—");

    const date = post.date ? post.date.split("T")[0] : "2026-10-24";
    const targetFile = path.join(outDir, `${post.slug}.md`);

    let translationKey = post.slug;
    if (fs.existsSync(targetFile)) {
      const prev = fs.readFileSync(targetFile, "utf8");
      const matchKey = prev.match(/translation_key:\s*["']?([^"'\n]+)/);
      if (matchKey) translationKey = matchKey[1].trim();
    }

    const output = `---
title: "${title}"
date: ${date}
slug: "${post.slug}"
translation_key: "${translationKey}"
lang: "en"
---

${md.trim()}
`;

    fs.writeFileSync(targetFile, output, "utf8");
    restored++;
  }

  console.log(`\nFinalizado con éxito: ${restored} posts restaurados.`);
})();
