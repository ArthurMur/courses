import { useMutation } from '@tanstack/react-query';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

// Кастомный хук для выполнения входа через OAuth
export function useOAuthSignIn(provider: ClientSafeProvider) {
  const searchParams = useSearchParams();
  // Получение значения параметра 'callbackUrl' из строки запроса
  const callbackUrl = searchParams.get('callbackUrl');

  // Создание мутации
  const oauthSignInMutation = useMutation({
    // Функция мутации, вызывающая вход через OAuth
    mutationFn: () =>
      signIn(provider.id, {
        callbackUrl: callbackUrl ?? undefined,
      }), // Вызов функции входа с указанием провайдера и URL обратного вызова
  });

  // Возврат объекта с состоянием загрузки мутации и функцией для выполнения входа через OAuth
  return {
    isPending: oauthSignInMutation.isPending,
    signIn: oauthSignInMutation.mutate,
  };
}
