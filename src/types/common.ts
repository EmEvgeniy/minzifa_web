// Общие базовые типы, используемые по всему приложению

export interface IMediaData {
  id: number;
  file: string | null;
  alt_text: string | null;
}

export interface IPaginationLink {
  active: boolean;
  label: string | null;
  page: string | null;
  url: string | null;
}

export interface PaginatedData<T> {
  data: T[];
  links?: IPaginationLink[] | null;
  meta?: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  } | null;
}
