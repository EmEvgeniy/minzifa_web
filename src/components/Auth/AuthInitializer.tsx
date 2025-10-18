// components/Auth/AuthInitializer.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export const AuthInitializer = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Откладываем проверку аутентификации для ускорения первого рендера
    const timer = setTimeout(() => {
      checkAuth();
    }, 100); // Небольшая задержка для приоритизации основного контента

    return () => clearTimeout(timer);
  }, [checkAuth]);

  // Этот компонент ничего не рендерит
  return null;
};

// Обертка с Suspense для еще большей оптимизации
export const AuthInitializerWithSuspense = () => {
  return (
    <Suspense fallback={null}>
      <AuthInitializer />
    </Suspense>
  );
};
