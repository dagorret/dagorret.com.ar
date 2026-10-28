import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function blogFeed(lang: 'es' | 'en', site: URL | undefined) {
  if (!site) throw new Error('Configure site in astro.config.mjs to generate RSS feeds.');

  const posts = (await getCollection('blog', ({ data }) => data.lang === lang))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: lang === 'en' ? 'Carlos Dagorret — English articles' : 'Carlos Dagorret — Artículos en español',
    description: lang === 'en'
      ? 'Essays, models, and technical notes.'
      : 'Ensayos, modelos y notas sobre sistemas, matemáticas y tecnología.',
    site,
    customData: `<language>${lang}</language>`,
    items: posts.map(({ data }) => ({
      title: data.title,
      pubDate: data.date,
      link: `${lang === 'en' ? '/en' : ''}/${data.slug}/`,
      categories: data.categories,
    })),
  });
}
