import { getCollection } from 'astro:content';
import { getTaxonomy as taxonomyFromPosts } from './taxonomy-core';

export { slugify, type TaxonomyItem, type TaxonomyCategory } from './taxonomy-core';

export async function getTaxonomy(lang: 'es' | 'en') {
  return taxonomyFromPosts(lang, await getCollection('blog'));
}
