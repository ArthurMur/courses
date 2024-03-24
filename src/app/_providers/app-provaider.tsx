'use client';

import { AppSessionProvider } from '@/kernel/lib/next-auth/client';
import { ThemeProvider } from '@/features/theme/theme-provider';
import { queryClient } from '@/shared/api/query-client';
import { ComposeChildren } from '@/shared/lib/react';
import { QueryClientProvider } from '@tanstack/react-query';

// Объявление компонента AppProvider для обеспечения контекста приложения
export function AppProvider({ children }: { children: React.ReactNode }) {
  // Возврат компонента ComposeChildren, объединяющего несколько провайдеров и дочерних элементов
  return (
    <ComposeChildren>
      {/* Провайдер темы */}
      <ThemeProvider />
      {/* Провайдер сессии приложения */}
      <AppSessionProvider />
      {/* Провайдер клиента запросов */}
      <QueryClientProvider client={queryClient} />
      {/* Дочерние элементы приложения */}
      {children}
    </ComposeChildren>
  );
}
