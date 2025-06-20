import { ClassValue } from 'clsx';
import { FaEnvelope } from 'react-icons/fa6';

export type SocialMediaIcon = {
  name: string;
  url: {
    [key: string]: string;
  };
  Icon: typeof FaEnvelope | React.FC;
};

export type SocialMediaProps = {
  socials?: SocialMediaIcon[];
  direction?: 'horizontal' | 'vertical';
  iconSize?: number;
  withBackground?: boolean;
  backgroundColor?: React.CSSProperties['backgroundColor'];
  gap?: number;
  iconColor?: React.CSSProperties['color'];
  className?: ClassValue;
  linkClassName?: ClassValue;
};
