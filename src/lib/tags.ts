import type { CollectionEntry } from 'astro:content';

type TopicData = Pick<CollectionEntry<'blog'>['data'], 'tags' | 'categories'>;

function topicKey(label: string) {
  return label.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Etiquetas y categorías de un post, sin repetir variantes de mayúsculas y acentos.
export function postTopics(data: TopicData) {
  const topics = new Map<string, string>();
  for (const value of [...data.tags, ...data.categories]) {
    const label = value.trim();
    const key = topicKey(label);
    if (key && !topics.has(key)) topics.set(key, label);
  }
  return [...topics.values()];
}
