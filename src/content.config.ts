import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    lang: z.enum(['es', 'en']),
    translation_key: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const lab = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/lab',
    generateId: ({ data }) => `${data.lang}/${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    lang: z.enum(['es', 'en']),
    translation_key: z.string().optional(),
    category: z.string(),
    order: z.number().int(),
    visual: z.enum(['inflation', 'population', 'birth-rate', 'neural-network', 'ols', 'phillips', 'omitted-variable', 'time-series']),
    status: z.enum(['preparation', 'interactive']).default('preparation'),
  }),
});

export const collections = { blog, lab };
