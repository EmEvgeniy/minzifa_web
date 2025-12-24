import { IMediaData } from '@/types';

export type DestinationCard = {
  id: number;
  name: string;
  slug: string;
  tours_count: number;
  media: IMediaData | null;
};
