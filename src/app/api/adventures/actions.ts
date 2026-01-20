'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateArticle(slug: string, locale: string) {
  // Revalidate the specific article page
  revalidatePath(`/${locale}/prototype/adventures/${slug}`);
  // Also revalidate the main list page as the excerpt/title might have changed
  revalidatePath(`/${locale}/prototype/adventures`);
  revalidatePath(`/prototype/adventures/${slug}`);
  revalidatePath(`/prototype/adventures`);
}
