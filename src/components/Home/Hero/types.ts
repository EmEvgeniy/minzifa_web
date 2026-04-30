import { IMediaData } from '@/types';

export interface Banner {
  id: number;
  name: string;
  subtitle?: string;
  link: string;
  link_title: string;
  media: IMediaData | null;
}
