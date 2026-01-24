// Block types and interfaces

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'quote'
  | 'info'
  | 'slider'
  | 'gallery'
  | 'tours'
  | 'list'
  | 'code'
  | 'separator';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  data: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
  };
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  data: {
    text: string;
  };
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  data: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  data: {
    text: string;
    author: string;
  };
}

export interface InfoBlock extends BaseBlock {
  type: 'info';
  data: {
    title: string;
    content: string;
  };
}

export interface SliderBlock extends BaseBlock {
  type: 'slider';
  data: {
    images: string[];
    caption?: string;
  };
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  data: {
    images: string[];
    caption?: string;
  };
}

export interface ToursItem {
  id?: number;
  title: string;
  image: string;
  duration: string;
  price: string;
  link: string;
}

export interface ToursBlock extends BaseBlock {
  type: 'tours';
  data: {
    items: ToursItem[];
    title?: string;
  };
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  data: {
    items: string[];
    ordered: boolean;
  };
}

export interface CodeBlock extends BaseBlock {
  type: 'code';
  data: {
    code: string;
    language?: string;
  };
}

export interface SeparatorBlock extends BaseBlock {
  type: 'separator';
  data: object;
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | QuoteBlock
  | InfoBlock
  | SliderBlock
  | GalleryBlock
  | ToursBlock
  | ListBlock
  | CodeBlock
  | SeparatorBlock;

export interface EditorState {
  blocks: Block[];
  activeBlockId: string | null;
}
