export interface Seo {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface Category {
  id: number;
  slug: string;
  image?: string;
  lang: string;
  name: string;
  description?: string;
  seo?: Seo;
  articles_count?: number;
}

export interface MediaFile {
  id: number;
  name: string;
  url: string;
  size: number;
  mime_type: string;
}

export interface MediaUploadResponse {
  message: string;
  data: MediaFile[];
  success?: boolean;
  file?: {
    filename?: string;
    url?: string;
  };
}

export interface Article {
  id: number;
  title: string;
  content: string; // MDX/JSON content
  lang: string;
  tags?: string[];
  country?: string[];
  excerpt: string;
  slug: string;
  readTime?: string | number;
  status_approved?: boolean;
  publishedAt?: string;
  image?: string;
  seo?: Seo;
  categories?: Category[];
  status: ArticleStatuses;
  userId?: number;
  user?: AdventureUser;
}

export interface ArticlePayload extends Omit<Partial<Article>, 'categories'> {
  categories?: (string | number)[];
}

export enum ArticleStatuses {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived',
  TO_REVIEW = 'ToReview',
  CANCELLED = 'Cancelled',
}

export enum AdventureRoles {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  SEO = 'SEO',
  MODERATOR = 'MODERATOR',
}

export interface AdventureUser {
  id: number;
  name: string;
  email: string;
  role: AdventureRoles;
  password?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResponse {
  user: AdventureUser;
  token: string;
}
