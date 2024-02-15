import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

// Кастомный хук для выполнения входа через Email
export function useEmailSignIn() {
  const searchParams = useSearchParams();
  // Получение значения параметра 'callbackUrl' из строки запроса
  const callbackUrl = searchParams.get('callbackUrl');

  // Создание мутации
  const emailSignInMutation = useMutation({
    // Функция мутации, вызывающая вход через Email
    mutationFn: (email: string) =>
      signIn('email', {
        // Вызов функции входа с указанием провайдера 'email' и электронного адреса пользователя
        email,
        callbackUrl: callbackUrl ?? undefined, // URL обратного вызова для перенаправления после успешного входа
      }),
  });

  // Возврат объекта с состоянием загрузки мутации и функцией для выполнения входа через Email
  return {
    isPending: emailSignInMutation.isPending,
    signIn: emailSignInMutation.mutate,
  };
}
