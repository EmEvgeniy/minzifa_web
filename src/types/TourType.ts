import { IMediaData } from './common';

export interface ITourType {
  id: number;
  name: string;
  slug: string;
  media: IMediaData | null;
  tours_count: number;
}

export type TourTypeResponse = ITourType[];
