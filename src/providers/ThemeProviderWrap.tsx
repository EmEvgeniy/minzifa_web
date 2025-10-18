'use client';
import { ReactNode } from 'react';

// Оптимизированный ThemeProvider без Material-UI
// Просто возвращает children без дополнительной обертки
export const ThemeProviderWrap = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
