export type NavItemType = {
  link: string;
  title: string;
  inner?: string;
};

export type NavMenuType = {
  menu: NavItemType[];
};

export type DestinationProps = {
  id?: number;
  icon?: {
    alt_text: string | null;
    file: string;
    id: number;
  };
  media?: {
    alt_text: string | null;
    file: string;
    id: number;
  };
  name: string;
  slug: string;
  tours_count: number;
  show_in_menu: boolean;
};
