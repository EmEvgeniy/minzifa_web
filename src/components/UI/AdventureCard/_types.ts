import { IMediaData } from "@/types";

export type AdventureCardType = {
  id: number;
  name: string;
  media: IMediaData;
  icon?: IMediaData;
  tours_count: number;
  slug: string;
};
