'use client';

import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg'; // Добавим опциональный размер
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, size = 'md' }) => {
  const getInitials = (name: string): string => {
    return name
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Настройка размеров
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-[42px] w-[42px] text-base',
    lg: 'h-16 w-16 text-xl',
  };

  return (
    <Avatar.Root
      className={`inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle bg-slate-200 ${sizeClasses[size]}`}
    >
      <Avatar.Image className="h-full w-full rounded-[inherit] object-cover" src={src} alt={name} />
      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center bg-primary font-medium text-foreground"
        delayMs={600}
      >
        {getInitials(name)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default UserAvatar;
