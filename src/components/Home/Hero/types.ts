import { IMediaData } from '@/types';

export interface Banner {
  id: number;
  name: string;
  subtitle?: string;
  link: string | null;
  link_title: string | null;
  media: IMediaData | null;
}
