import {
  FaInstagram,
  FaFacebookF,
  FaPinterest,
  FaWhatsapp,
  FaTelegram,
  FaEnvelope,
} from 'react-icons/fa6';
import React from 'react';
import { cn } from '@/utils/utils';
import { SocialMediaIcon, SocialMediaProps } from './_types';

const defaults: SocialMediaIcon[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    Icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    Icon: FaInstagram,
  },
  {
    name: 'Pinterest',
    url: 'https://www.twitter.com',
    Icon: FaPinterest,
  },
  {
    name: 'Telegram',
    url: 'https://www.linkedin.com',
    Icon: FaTelegram,
  },
  {
    name: 'WhatsApp',
    url: 'https://www.youtube.com',
    Icon: FaWhatsapp,
  },
  {
    name: 'Mail',
    url: 'https://www.pinterest.com',
    Icon: FaEnvelope,
  },
];

export const SocialMedia: React.FC<SocialMediaProps> = ({
  socials = defaults,
  direction = 'horizontal',
  iconSize = 24,
  withBackground = false,
  backgroundColor = '#f0f0f0',
  iconColor = '#fff',
  gap = 10,
  linkClassName,
  className,
}) => {
  return (
    <div
      className={cn(className)}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: `${gap}px`,
      }}
    >
      {socials.map(({ Icon, url }, index) => (
        <a
          className={cn(linkClassName)}
          key={index}
          href={url}
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
          <Icon size={iconSize} color={iconColor} />
        </a>
      ))}
    </div>
  );
};
