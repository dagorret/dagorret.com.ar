import { getCollection } from 'astro:content';

export async function labEntries(lang: 'es' | 'en') {
  return (await getCollection('lab', ({ data }) => data.lang === lang))
    .sort((a, b) => a.data.order - b.data.order);
}

export function labUrl(lang: 'es' | 'en', slug = '') {
  return `${lang === 'en' ? '/en' : ''}/lab/${slug ? `${slug}/` : ''}`;
}

export async function labPaths(lang: 'es' | 'en') {
  return (await labEntries(lang))
    .filter(entry => !['inflation', 'neural-network'].includes(entry.data.visual))
    .map(entry => ({ params: { slug: entry.data.slug }, props: { entry } }));
}
