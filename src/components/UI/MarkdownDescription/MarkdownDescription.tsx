import { cn } from '@/utils/utils';
import Markdown from 'markdown-to-jsx';
import { Fragment } from 'react';

const options = {
  overrides: {
    h2: {
      props: {
        className: 'text-2xl font-semibold text-gray-800',
      },
    },
    h3: {
      props: {
        className: 'text-xl font-semibold text-gray-800',
      },
    },
    p: {
      props: {
        className: 'text-base text-gray-700 mb-4',
      },
    },
    ul: {
      props: {
        className: 'list-disc ml-6 mb-4',
      },
    },
    ol: {
      props: {
        className: 'list-decimal ml-6 mb-4',
      },
    },
    li: {
      props: {
        className: 'mb-2',
      },
    },
    strong: {
      props: {
        className: 'font-semibold text-gray-900',
      },
    },
    a: {
      props: {
        className: 'text-blue-600 hover:underline',
      },
    },
    table: {
      props: {
        className:
          'bg-white w-full border-collapse border border-gray-300 min-w-full border-collapse',
      },
    },
    th: {
      props: {
        className: 'border border-gray-300 p-2',
      },
    },
    tr: {
      props: {
        className: 'border border-gray-300',
      },
    },
    td: {
      props: {
        className: 'border border-gray-300 p-2',
      },
    },
  },
  wrapper: Fragment,
};

type DescriptionProps = {
  description: string;
  subtitle?: string;
  className?: string;
};

export default function MarkdownDescription({
  description,
  subtitle = '',
  className = '',
}: DescriptionProps) {
  if (!description) return null;

  return (
    <div className={cn(className)}>
      {subtitle && (
        <h2 className="text-2xl font-semibold mb-4 max-[920px]:text-[30px] max-[550px]:text-[24px]">
          {subtitle}
        </h2>
      )}
      <Markdown options={options}>{description}</Markdown>
    </div>
  );
}
