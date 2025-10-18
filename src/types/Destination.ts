import { IMediaData } from './common';

export interface IDestination {
  id: number;
  name: string;
  slug: string;
  media: IMediaData | null;
  icon: IMediaData | null;
  tours_count: number;
  show_in_menu: boolean;
}

export type DestinationResponse = IDestination[];
