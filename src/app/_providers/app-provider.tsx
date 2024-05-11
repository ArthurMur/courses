'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AppSessionProvider } from '@/kernel/lib/next-auth/client';
import { ThemeProvider } from '@/features/theme/theme-provider';
import { ComposeChildren } from '@/shared/lib/react';
import { sharedApi } from '@/kernel/lib/trpc/client';
import { TRPCUntypedClient, httpBatchLink } from '@trpc/client';
import { publicConfig } from '@/shared/config/public';
import { AnyRouter } from '@trpc/server';

// Объявление компонента AppProvider для обеспечения контекста приложения
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState<TRPCUntypedClient<AnyRouter>>(() =>
    sharedApi.createClient({
      links: [
        httpBatchLink({
          url: `${publicConfig.PUBLIC_URL}/api/trpc`,
        }),
      ],
    })
  );
  // Возврат компонента ComposeChildren, объединяющего несколько провайдеров и дочерних элементов
  return (
    <ComposeChildren>
      <sharedApi.Provider client={trpcClient} queryClient={queryClient}>
        <></>
      </sharedApi.Provider>
      {/* Провайдер клиента запросов */}
      <QueryClientProvider client={queryClient} />
      {/* Провайдер темы */}
      <ThemeProvider />
      {/* Провайдер сессии приложения */}
      <AppSessionProvider />

      {/* Дочерние элементы приложения */}
      {children}
    </ComposeChildren>
  );
}
