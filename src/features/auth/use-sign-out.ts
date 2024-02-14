import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Кастомный хук для выхода из аккаунта
export function useSignOut() {
  // Получение объекта маршрутизатора
  const router = useRouter();

  // Использование хука useMutation для создания мутации
  const mutation = useMutation({
    // Функция мутации, вызывающая выход из аккаунта с перенаправлением на главную страницу
    mutationFn: () => signOut({ callbackUrl: '/' }),
    // Обработчик успешного выполнения мутации
    onSuccess: async () => {
      // Перенаправление на страницу входа после успешного выхода из аккаунта
      router.push('/auth/sign-in');
    },
  });

  // Возврат функции для выхода из аккаунта и состояния загрузки мутации
  return {
    signOut: mutation.mutateAsync, // Функция для выполнения выхода из аккаунта
    isPending: mutation.isPending, // Флаг состояния загрузки мутации
  };
}
