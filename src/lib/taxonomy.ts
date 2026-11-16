import { getCollection, type CollectionEntry } from 'astro:content';
import config from '../data/taxonomy.json';

type Language = 'es' | 'en';
type Post = CollectionEntry<'blog'>;

export interface TaxonomyItem {
  slug: string;
  label: string;
  count: number;
  posts: Post[];
  indexable: boolean;
}

export interface TaxonomyCategory extends TaxonomyItem {
  description: string;
  translationSlug?: string;
}

type CategoryDefinition = Partial<Record<Language, { label: string; description: string }>>;
const categoryDefinitions: CategoryDefinition[] = Object.values(config.categories);

export function slugify(label: string) {
  return label.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function accentCount(label: string) {
  return (label.normalize('NFD').match(/\p{M}/gu) ?? []).length;
}

function groupTopics(posts: Post[], field: 'categories' | 'tags', aliases: Record<string, string>, lang: Language): TaxonomyItem[] {
  // Los alias se expresan como etiqueta de origen → etiqueta canónica.
  const aliasBySlug = new Map(Object.entries(aliases).map(([source, target]) => [slugify(source), target.trim()]));
  const groups = new Map<string, { labels: Map<string, number>; posts: Post[] }>();

  for (const post of posts) {
    const seen = new Set<string>();
    for (const value of new Set(post.data[field])) {
      const original = value.trim();
      const label = aliasBySlug.get(slugify(original)) ?? original;
      const slug = slugify(label);
      if (!slug) continue;

      let group = groups.get(slug);
      if (!group) {
        group = { labels: new Map(), posts: [] };
        groups.set(slug, group);
      }
      group.labels.set(label, (group.labels.get(label) ?? 0) + 1);
      // Un artículo cuenta una sola vez aunque use varias variantes del mismo slug.
      if (!seen.has(slug)) {
        group.posts.push(post);
        seen.add(slug);
      }
    }
  }

  return [...groups].map(([slug, group]) => {
    const [label] = [...group.labels].sort(([a, aCount], [b, bCount]) =>
      accentCount(b) - accentCount(a) || bCount - aCount || a.localeCompare(b, lang)
    )[0];
    const count = group.posts.length;
    return { slug, label, count, posts: group.posts, indexable: field === 'categories' || count >= config.threshold };
  }).sort((a, b) => a.label.localeCompare(b.label, lang) || a.slug.localeCompare(b.slug));
}

export async function getTaxonomy(lang: Language) {
  const posts = (await getCollection('blog', ({ data }) => data.lang === lang))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()
      || a.data.slug.localeCompare(b.data.slug));

  const otherLang = lang === 'es' ? 'en' : 'es';
  const categories: TaxonomyCategory[] = groupTopics(posts, 'categories', config.categoryAliases[lang], lang)
    .map(category => {
      const definition = categoryDefinitions.find(item => {
        const localized = item[lang];
        return localized && slugify(localized.label) === category.slug;
      });
      if (!definition) {
        console.warn(`[taxonomy] Categoría sin definición en taxonomy.json (${lang}): ${category.label} (${category.slug})`);
      }
      const translation = definition?.[otherLang];
      return {
        ...category,
        description: definition?.[lang]?.description ?? '',
        translationSlug: translation ? slugify(translation.label) : undefined,
      };
    });

  return {
    categories,
    tags: groupTopics(posts, 'tags', config.tagAliases[lang], lang),
  };
}
