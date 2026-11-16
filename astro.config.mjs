import { defineConfig } from 'astro/config';
import { unified, parseFrontmatter } from '@astrojs/markdown-remark';
import { globSync, readFileSync } from 'node:fs';
import { getTaxonomy } from './src/lib/taxonomy-core.ts';
import remarkMath from 'remark-math';
import remarkSingleLineDisplayMath from './src/plugins/remark-single-line-display-math.mjs';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Comparte con las páginas el agrupamiento, los alias y el umbral de taxonomy.json.
// Lee los artículos originales, sin depender del HTML ni del orden de renderizado.
const blogDirectory = new URL('./src/content/blog/', import.meta.url);
const posts = [...globSync('**/*.{md,mdx}', { cwd: blogDirectory })].map(id => {
  const { frontmatter } = parseFrontmatter(readFileSync(new URL(id, blogDirectory), 'utf8'));
  return {
    id,
    collection: 'blog',
    data: {
      ...frontmatter,
      date: new Date(frontmatter.date),
      categories: frontmatter.categories ?? [],
      tags: frontmatter.tags ?? [],
    },
  };
});
const indexableTags = new Set(['es', 'en'].flatMap(lang =>
  getTaxonomy(lang, posts).tags.filter(tag => tag.indexable)
    .map(tag => `${lang === 'en' ? '/en' : ''}/tags/${tag.slug}/`)
));

export default defineConfig({
  site: 'https://dagorret.com.ar',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [sitemap({
    filter: page => {
      const pathname = new URL(page).pathname;
      return !/^\/(?:en\/)?tags\/[^/]+\/$/.test(pathname) || indexableTags.has(pathname);
    },
  }), mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkSingleLineDisplayMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
