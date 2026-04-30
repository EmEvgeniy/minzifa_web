import { cn } from '@/utils/utils';
import { SocialMediaProps } from './_types';
import { useLocale } from 'next-intl';
import { contacts } from '@/store/contacts';
import Link from 'next/link';

export default function SocialMedia({
  socials = contacts.social_media,
  iconSize = 24,
  iconColor = '#fff',
  linkClassName,
  className,
}: SocialMediaProps) {
  const locale = useLocale();
  return (
    <div className={cn(className)}>
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
            >
              {Icon && <Icon size={iconSize} color={iconColor} />}
            </Link>
          ),
      )}
    </div>
  );
}
