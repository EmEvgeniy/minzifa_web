import { Destination } from "@/components/Tour/_types";

export type DestinationData = {
    id: number;
    name: string;
    description: string;
    parent: Destination;
    slug: string;
    seo_metadata: {
        title: string;
        description: string;
        keywords: string;
    }
    media: {
        id: number;
        file: string;
        alt_text: string;
    };
    icon: {
        id: number;
        file: string;
        alt_text: string;
    }
}