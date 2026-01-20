import { ArticleStatuses } from '@/types/adventures';
import { z } from 'zod';

// Schema
export const articleSchema = z.object({
  id: z.number().optional(),
  lang: z.string().min(2, 'Language is required'),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),

  // Metadata
  categories: z.array(z.number()).optional(),
  userId: z.number().min(1, 'Author is required'),
  publishedAt: z.string().optional(),
  status: z.enum(Object.values(ArticleStatuses) as [string, ...string[]]).optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readTime: z.string().optional(),

  // SEO
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.string().optional(),
    })
    .optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
