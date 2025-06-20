// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown, 'data' for JSON/YAML
  schema: z.object({
    title: z.string(),
    pubDate: z.string().transform((str) => new Date(str)), // MODIFICATO: Accetta stringa e la trasforma in Date
    description: z.string(),
    author: z.string().optional(),
    image: z.object({
      url: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    // Il layout viene specificato nel frontmatter di ogni post,
    // non è necessario definirlo nello schema se è sempre lo stesso o varia.
    // Se vuoi forzarlo o fornire un default, potresti aggiungerlo qui.
  }),
});

export const collections = {
  'blog': blogCollection,
};
