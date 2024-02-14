'use client';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

// Объявление компонента AppSessionProvider для обеспечения доступа к сессии в приложении
export function AppSessionProvider({
  children, // Дочерние элементы
}: {
  children?: React.ReactNode; // Дочерние элементы являются допустимыми узлами React
}) {
  // Возврат компонента SessionProvider, обертывающего дочерние элементы
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
