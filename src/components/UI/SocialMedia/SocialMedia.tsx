import { cn } from '@/utils/utils';
import { SocialMediaProps } from './_types';
import { useLocale } from 'next-intl';
import { contacts } from '@/store/contacts';
import Link from 'next/link';

export default function SocialMedia({
  socials = contacts.social_media,
  direction = 'horizontal',
  iconSize = 24,
  withBackground = false,
  backgroundColor = '#f0f0f0',
  iconColor = '#fff',
  gap = 10,
  linkClassName,
  className,
}: SocialMediaProps) {
  const locale = useLocale();
  return (
    <div
      className={cn(className)}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: `${gap}px`,
        flexWrap: 'wrap',
      }}
    >
      {socials.map(
        ({ Icon, url }, index) =>
          url &&
          url[locale] && (
            <Link
              className={cn(linkClassName)}
              key={index}
              href={url[locale]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                borderRadius: withBackground ? '50%' : 'none',
                backgroundColor: withBackground ? backgroundColor : 'transparent',
                textDecoration: 'none',
              }}
            >
              {Icon && <Icon size={iconSize} color={iconColor} />}
            </Link>
          ),
      )}
    </div>
  );
}
