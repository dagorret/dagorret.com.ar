import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import remarkSingleLineDisplayMath from './src/plugins/remark-single-line-display-math.mjs';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://dagorret.com.ar',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkSingleLineDisplayMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
