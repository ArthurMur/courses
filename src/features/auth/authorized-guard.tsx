'use client';

import { useAppSession } from '@/entities/user/session.client';
import { FullPageSpinner } from '@/shared/ui/full-page-spinner';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthorizedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession(); // Получение сессии

  const isUnauthenticated = session.status === 'unauthenticated'; // Проверка, является ли сессия неаутентифицированной

  useEffect(() => {
    if (isUnauthenticated) {
      signIn(); // Вызов функции signIn в случае неаутентифицированной сессии
    }
  }, [isUnauthenticated]); // Выполнение эффекта при изменении статуса аутентификации

  const isLoading =
    session.status === 'loading' || session.status === 'unauthenticated'; // Определение состояния загрузки на основе статуса сессии

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />{' '}
      {/* Отображение компонента FullPageSpinner в зависимости от состояния загрузки */}
      {session.status === 'authenticated' && children}{' '}
      {/* Отображение дочерних элементов только для аутентифицированных сессий */}
    </>
  );
}
