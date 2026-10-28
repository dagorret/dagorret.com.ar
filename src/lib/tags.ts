import type { CollectionEntry } from 'astro:content';
import { sortedPosts, type BlogLanguage } from './posts';

type TopicData = Pick<CollectionEntry<'blog'>['data'], 'tags' | 'categories'>;

export function tagSlug(label: string) {
  return label.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Unificar variantes de mayúsculas y acentos sin repetir un post en el listado.
export function postTopics(data: TopicData) {
  const topics = new Map<string, { slug: string; label: string }>();
  for (const value of [...data.tags, ...data.categories]) {
    const label = value.trim();
    const slug = tagSlug(label);
    if (slug && !topics.has(slug)) topics.set(slug, { slug, label });
  }
  return [...topics.values()];
}

export function tagUrl(lang: BlogLanguage, slug: string) {
  return `${lang === 'en' ? '/en' : ''}/tags/${slug}/`;
}

export async function tagPaths(lang: BlogLanguage) {
  const groups = new Map<string, { label: string; posts: CollectionEntry<'blog'>[] }>();
  for (const post of await sortedPosts(lang)) {
    for (const { slug, label } of postTopics(post.data)) {
      if (!groups.has(slug)) groups.set(slug, { label, posts: [] });
      groups.get(slug)!.posts.push(post);
    }
  }
  return [...groups].map(([tag, props]) => ({ params: { tag }, props }));
}
