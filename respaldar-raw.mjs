import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://dagorret.com.ar/wp-json/wp/v2/posts';
const OUT_DIR = './raw_posts';

async function respaldar() {
  let page = 1;
  let total = 0;
  console.log("Iniciando respaldo en crudo (JSON + HTML + Taxonomías)...\n");

  while (true) {
    const res = await fetch(`${BASE_URL}?per_page=100&page=${page}&_embed`);
    if (!res.ok) break;

    const posts = await res.json();
    if (!posts.length) break;

    for (const post of posts) {
      total++;
      const fecha = post.date.split('T')[0];
      const anio = fecha.split('-')[0];
      const carpetaAnio = path.join(OUT_DIR, anio);
      fs.mkdirSync(carpetaAnio, { recursive: true });

      // Extraer nombres reales de categorías y tags
      const terms = post._embedded?.['wp:term'] || [];
      const categorias = (terms[0] || []).map(t => t.name);
      const tags = (terms[1] || []).map(t => t.name);

      const data = {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: fecha,
        year: anio,
        categories: categorias,
        tags: tags,
        content_html: post.content.rendered,
      };

      const destino = path.join(carpetaAnio, `${post.slug}.json`);
      fs.writeFileSync(destino, JSON.stringify(data, null, 2));

      console.log(`[${total}/152] Guardado: ${anio}/${post.slug}.json (tags: ${tags.length}, cat: ${categorias.length})`);
    }
    page++;
  }

  console.log(`\n✔ Respaldo finalizado con éxito: ${total} artículos guardados en ./raw_posts/`);
}

respaldar();
