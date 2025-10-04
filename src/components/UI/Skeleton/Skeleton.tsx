import React from 'react';
import { cn } from '@/utils/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gray-300';

  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return <div className={cn(baseClasses, variantClasses[variant], className)} style={style} />;
};
