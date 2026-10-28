import { getCollection } from 'astro:content';

export const POSTS_PER_PAGE = 12;
export type BlogLanguage = 'es' | 'en';

export async function sortedPosts(lang: BlogLanguage) {
  return (await getCollection('blog', ({ data }) => data.lang === lang))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()
      || a.data.slug.localeCompare(b.data.slug));
}

export function homePageUrl(lang: BlogLanguage, page: number) {
  const home = lang === 'en' ? '/en/' : '/';
  return page === 1 ? home : `${home}page/${page}/`;
}
