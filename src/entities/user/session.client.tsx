'use client';
import { useSession } from 'next-auth/react';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export const useAppSession = useSession;

export const useRole = () => {
  const session = useAppSession(); // Получение сессии

  return session?.data?.user.role; // Возврат роли пользователя из данных сессии, если она существует
};

// Объявление компонента AppSessionProvider для обеспечения доступа к сессии в приложении
export function AppSessionProvider({
  children, // Дочерние элементы
}: {
  children?: React.ReactNode; // Дочерние элементы являются допустимыми узлами React
}) {
  // Возврат компонента SessionProvider, обертывающего дочерние элементы
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
