import { Block, BlockType } from './types';

// Convert blocks to Markdown
export const parseBlocksToMarkdown = (blocks: Block[]): string => {
  return blocks
    .sort((a, b) => a.order - b.order)
    .map(blockToMarkdown)
    .join('\n\n');
};

// Helper: Convert HTML formatting to Markdown
const htmlToMarkdown = (html: string): string => {
  if (!html) return '';

  const text = html
    .replace(/<b[^>]*>(.*?)<\/b>|<strong[^>]*>(.*?)<\/strong>/gi, '**$1$2**')
    .replace(/<i[^>]*>(.*?)<\/i>|<em[^>]*>(.*?)<\/em>/gi, '*$1$2*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n');

  // Strip all other HTML tags
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.body.textContent || doc.body.innerText || text.replace(/<[^>]*>/g, '');
  }

  return text.replace(/<[^>]*>/g, '');
};

// Convert single block to Markdown
const blockToMarkdown = (block: Block): string => {
  switch (block.type) {
    case 'heading':
      return `${'#'.repeat(block.data.level)} ${htmlToMarkdown(block.data.text)}`;

    case 'paragraph':
      return htmlToMarkdown(block.data.text);

    case 'image':
      return `<Image src="${block.data.src}" alt="${block.data.alt}"${block.data.caption ? ` caption="${block.data.caption}"` : ''} />`;

    case 'quote':
      return `<Quote author="${block.data.author}">${block.data.text}</Quote>`;

    case 'info':
      return `<InfoBlock title="${block.data.title}">${block.data.content}</InfoBlock>`;

    case 'slider': { // Обернуто в блоки {}
      const images = block.data.images.map((img: string) => `"${img}"`).join(', ');
      return `<Slider images={[${images}]}${block.data.caption ? ` caption="${block.data.caption}"` : ''} />`;
    }

    case 'gallery': { // Обернуто в блоки {}
      const galleryImages = block.data.images.map((img: string) => `"${img}"`).join(', ');
      return `<Gallery images={[${galleryImages}]}${block.data.caption ? ` caption="${block.data.caption}"` : ''} />`;
    }

    case 'tours': { // Обернуто в блоки {}
      const tourItems = block.data.items
        .map(
          (item: { title: string; image: string; duration: string; price: string; link: string }) =>
            `{ title: "${item.title}", image: "${item.image}", duration: "${item.duration}", price: "${item.price}", link: "${item.link}" }`,
        )
        .join(', ');
      return `<Tours${block.data.title ? ` title="${block.data.title}"` : ''} items={[${tourItems}]} />`;
    }

    case 'list': {
      const prefix = block.data.ordered ? '1. ' : '- ';
      return block.data.items.map((item: string) => `${prefix}${item}`).join('\n');
    }

    case 'code': {
      const lang = block.data.language || '';
      return `\`\`\`${lang}\n${block.data.code}\n\`\`\``;
    }

    case 'separator':
      return `<Separator />`;

    default:
      return '';
  }
};

// Generate unique ID
export const generateId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

// Helper: Convert Markdown inline formatting to HTML
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  return markdown
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
};

// Convert Markdown to blocks with robust line parsing and merging
export const parseMarkdownToBlocks = (markdown: string): Block[] => {
  if (!markdown) return [];

  const lines = markdown.split(/\r?\n/);
  const rawBlocks: Block[] = [];
  let order = 0;

  let inComponent = false;
  let componentBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (inComponent) {
      componentBuffer.push(line);
      if (line.match(/<\/[A-Z][a-zA-Z0-9]*>/) || line.trim().endsWith('/>')) {
        const fullComponent = componentBuffer.join('\n');
        const block = parseComponentString(fullComponent, order++);
        if (block) rawBlocks.push(block);
        inComponent = false;
        componentBuffer = [];
      }
      continue;
    }

    if (trimmed.match(/^<[A-Z][a-zA-Z0-9]*/)) {
      if (trimmed.endsWith('/>') || trimmed.match(/<\/[A-Z][a-zA-Z0-9]*>$/)) {
        const block = parseComponentString(trimmed, order++);
        if (block) rawBlocks.push(block);
      } else {
        inComponent = true;
        componentBuffer = [line];
      }
      continue;
    }

    if (!trimmed) continue;

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      rawBlocks.push({
        id: generateId(),
        type: 'heading',
        order: order++,
        data: { 
          level: headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6, // Типизация уровня
          text: markdownToHtml(headingMatch[2]) 
        },
      });
      continue;
    }

    if (trimmed.match(/^[-*]\s/)) {
      const text = trimmed.replace(/^[-*]\s+/, '');
      rawBlocks.push({
        id: generateId(),
        type: 'list',
        order: order++,
        data: { items: [text], ordered: false },
      });
      continue;
    }

    if (trimmed.match(/^\d+\.\s/)) {
      const text = trimmed.replace(/^\d+\.\s+/, '');
      rawBlocks.push({
        id: generateId(),
        type: 'list',
        order: order++,
        data: { items: [text], ordered: true },
      });
      continue;
    }

    rawBlocks.push({
      id: generateId(),
      type: 'paragraph',
      order: order++,
      data: { text: markdownToHtml(line) },
    });
  }

  const mergedBlocks: Block[] = [];
  if (rawBlocks.length === 0) return [];

  let current = rawBlocks[0];

  for (let i = 1; i < rawBlocks.length; i++) {
    const next = rawBlocks[i];

    if (current.type === 'paragraph' && next.type === 'paragraph') {
      current.data.text += '\n' + next.data.text;
      continue;
    }

    if (
      current.type === 'list' &&
      next.type === 'list' &&
      current.data.ordered === next.data.ordered
    ) {
      current.data.items.push(...next.data.items);
      continue;
    }

    mergedBlocks.push(current);
    current = next;
  }

  mergedBlocks.push(current);
  return mergedBlocks.map((b, idx) => ({ ...b, order: idx }));
};

const parseComponentString = (str: string, order: number): Block | null => {
  const imageMatch = str.match(
    /<Image\s+src="([^"]+)"\s+alt="([^"]*)"(?:\s+caption="([^"]*)")?\s*\/>/,
  );
  if (imageMatch) {
    return {
      id: generateId(),
      type: 'image',
      order,
      data: { src: imageMatch[1], alt: imageMatch[2], caption: imageMatch[3] || '' },
    };
  }

  const quoteMatch = str.match(/<Quote\s+author="([^"]*)">([\s\S]*?)<\/Quote>/);
  if (quoteMatch) {
    return {
      id: generateId(),
      type: 'quote',
      order,
      data: { author: quoteMatch[1], text: quoteMatch[2].trim() },
    };
  }

  const infoMatch = str.match(/<InfoBlock\s+title="([^"]*)">([\s\S]*?)<\/InfoBlock>/);
  if (infoMatch) {
    return {
      id: generateId(),
      type: 'info',
      order,
      data: { title: infoMatch[1], content: infoMatch[2].trim() },
    };
  }

  const sliderMatch = str.match(/<Slider\s+images=\{\[([^\]]*)\]\}(?:\s+caption="([^"]*)")?\s*\/>/);
  if (sliderMatch) {
    const images = sliderMatch[1].split(',').map((s) => s.trim().replace(/^"|"$/g, ''));
    return {
      id: generateId(),
      type: 'slider',
      order,
      data: { images, caption: sliderMatch[2] || '' },
    };
  }

  const galleryMatch = str.match(
    /<Gallery\s+images=\{\[([^\]]*)\]\}(?:\s+caption="([^"]*)")?\s*\/>/,
  );
  if (galleryMatch) {
    const images = galleryMatch[1].split(',').map((s) => s.trim().replace(/^"|"$/g, ''));
    return {
      id: generateId(),
      type: 'gallery',
      order,
      data: { images, caption: galleryMatch[2] || '' },
    };
  }

  const toursMatch = str.match(/<Tours(?:\s+title="([^"]*)")?\s+items=\{\[([\s\S]*?)\]\}\s*\/>/);
  if (toursMatch) {
    // Типизация айтемов для туров
    interface TourItem {
      title: string;
      image: string;
      duration: string;
      price: string;
      link: string;
    }
    const items: TourItem[] = [];
    const itemsStr = toursMatch[2];
    const itemStrings = itemsStr.split(/}\s*,\s*{|}/);

    itemStrings.forEach((itemStr) => {
      const title = itemStr.match(/title\s*[:=]\s*["']([^"']+)["']/i)?.[1] || '';
      const image = itemStr.match(/image\s*[:=]\s*["']([^"']+)["']/i)?.[1] || '';
      const duration = itemStr.match(/duration\s*[:=]\s*["']([^"']+)["']/i)?.[1] || '';
      const price = itemStr.match(/price\s*[:=]\s*["']([^"']+)["']/i)?.[1] || '';
      const link = itemStr.match(/link\s*[:=]\s*["']([^"']+)["']/i)?.[1] || '';

      if (title || image || link) {
        items.push({ title, image, duration, price, link });
      }
    });

    return {
      id: generateId(),
      type: 'tours',
      order,
      data: {
        title: toursMatch[1] || '',
        items,
      },
    };
  }

  if (str.includes('<Separator />')) {
    return { id: generateId(), type: 'separator', order, data: {} };
  }

  return null;
};

export const createBlock = (type: BlockType, order: number): Block => {
  const id = generateId();

  switch (type) {
    case 'heading':
      return { id, type, order, data: { level: 2, text: 'Heading' } };
    case 'paragraph':
      return { id, type, order, data: { text: 'Start typing...' } };
    case 'image':
      return { id, type, order, data: { src: '', alt: '', caption: '' } };
    case 'quote':
      return { id, type, order, data: { text: '', author: '' } };
    case 'info':
      return { id, type, order, data: { title: '', content: '' } };
    case 'slider':
      return { id, type, order, data: { images: [], caption: '' } };
    case 'gallery':
      return { id, type, order, data: { images: [], caption: '' } };
    case 'tours':
      return { id, type, order, data: { items: [], title: 'Our recommended trips' } };
    case 'list':
      return { id, type, order, data: { items: ['Item 1'], ordered: false } };
    case 'code':
      return { id, type, order, data: { code: '', language: 'javascript' } };
    case 'separator':
      return { id, type, order, data: {} };
    default:
      return { id, type: 'paragraph', order, data: { text: '' } };
  }
};

export const cleanHtml = (html: string): string => {
  if (!html) return '';
  if (typeof window === 'undefined') return html;

  const doc = new DOMParser().parseFromString(html, 'text/html');

  const clean = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const content = Array.from(el.childNodes).map(clean).join('');

    if (['b', 'strong'].includes(tag)) return `<b>${content}</b>`;
    if (['i', 'em'].includes(tag)) return `<i>${content}</i>`;
    if (tag === 'a') {
      const href = el.getAttribute('href');
      return href ? `<a href="${href}">${content}</a>` : content;
    }
    if (tag === 'br') return '<br>';

    return content;
  };

  return Array.from(doc.body.childNodes).map(clean).join('');
};

export const parseHtmlToBlocks = (html: string): Block[] => {
  if (typeof window === 'undefined') return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blocks: Block[] = [];
  let order = 0;

  const processNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const content = node.textContent?.trim();
      if (content) {
        blocks.push({
          id: generateId(),
          type: 'paragraph',
          order: order++,
          data: { text: cleanHtml(node.textContent || '') },
        });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    const headingMatch = tag.match(/^h([1-6])$/);
    if (headingMatch) {
      const text = cleanHtml(el.innerHTML).trim();
      if (text) {
        blocks.push({
          id: generateId(),
          type: 'heading',
          order: order++,
          // Исправлено: явное приведение к корректному типу уровня
          data: { level: parseInt(headingMatch[1]) as 1 | 2 | 3 | 4 | 5 | 6, text },
        });
      }
      return;
    }

    if (tag === 'p') {
      const content = cleanHtml(el.innerHTML).trim();
      if (content) {
        blocks.push({
          id: generateId(),
          type: 'paragraph',
          order: order++,
          data: { text: content },
        });
      }
      return;
    }

    if (['div', 'section', 'article', 'main', 'body'].includes(tag)) {
      const children = Array.from(el.children);
      const hasBlockChildren = children.some((child) =>
        /^(p|h[1-6]|ul|ol|blockquote|img|hr|div|section|article)$/i.test(child.tagName),
      );

      if (hasBlockChildren) {
        Array.from(el.childNodes).forEach(processNode);
      } else {
        const content = cleanHtml(el.innerHTML).trim();
        if (content) {
          blocks.push({
            id: generateId(),
            type: 'paragraph',
            order: order++,
            data: { text: content },
          });
        }
      }
      return;
    }

    if (tag === 'ul' || tag === 'ol') {
      const items = Array.from(el.querySelectorAll('li'))
        .map((li) => cleanHtml(li.innerHTML).trim())
        .filter(Boolean);
      if (items.length > 0) {
        blocks.push({
          id: generateId(),
          type: 'list',
          order: order++,
          data: { items, ordered: tag === 'ol' },
        });
      }
      return;
    }

    if (tag === 'blockquote') {
      const text = cleanHtml(el.innerHTML).trim();
      if (text) {
        blocks.push({
          id: generateId(),
          type: 'quote',
          order: order++,
          data: { text, author: '' },
        });
      }
      return;
    }

    if (tag === 'hr') {
      blocks.push({ id: generateId(), type: 'separator', order: order++, data: {} });
      return;
    }

    if (tag === 'img') {
      const src = el.getAttribute('src');
      if (src) {
        blocks.push({
          id: generateId(),
          type: 'image',
          order: order++,
          data: { src, alt: el.getAttribute('alt') || '', caption: '' },
        });
      }
      return;
    }

    const content = cleanHtml(el.innerHTML).trim();
    if (content) {
      blocks.push({
        id: generateId(),
        type: 'paragraph',
        order: order++,
        data: { text: content },
      });
    }
  };

  Array.from(doc.body.childNodes).forEach(processNode);

  if (blocks.length === 0 && doc.body.innerText.trim()) {
    blocks.push({
      id: generateId(),
      type: 'paragraph',
      order: order++,
      data: { text: cleanHtml(doc.body.innerHTML) },
    });
  }

  return blocks;
};