'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, type ReactNode } from 'react';

type QueryProviderType = {
  children: ReactNode;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
      retry: 0,
    },
  },
});

export const QueryProvider: FC<QueryProviderType> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
