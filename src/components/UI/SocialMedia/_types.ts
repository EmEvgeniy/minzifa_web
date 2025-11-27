import { ClassValue } from 'clsx';
import { FaEnvelope } from 'react-icons/fa6';
import {CSSProperties, FC} from "react";

export type SocialMediaIcon = {
  name?: string;
  url?: {
    [key: string]: string;
  };
  Icon?: typeof FaEnvelope | FC;
};

export type SocialMediaProps = {
  socials?: SocialMediaIcon[];
  direction?: 'horizontal' | 'vertical';
  iconSize?: number;
  withBackground?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  gap?: number;
  iconColor?: CSSProperties['color'];
  className?: ClassValue;
  linkClassName?: ClassValue;
};
