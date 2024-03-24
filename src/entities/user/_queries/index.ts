import { useQueryClient } from '@tanstack/react-query';
import { getUserProfileAction } from '../_actions/get-user-profile';
import { UserId } from '@/kernel/domain/user';

// базовый ключ для кеширования запросов
const baseKey = 'user';

export const getProfileQuery = (userId: UserId) => ({
  // Ключ запроса состоит из базового ключа, типа запроса и идентификатора пользователя
  queryKey: [baseKey, 'getProfileById', userId],
  // Функция запроса возвращает результат вызова getUserProfileAction с переданным идентификатором пользователя
  queryFn: () => getUserProfileAction({ userId }),
});

// Экспортируем функцию useInvalidateProfile, которая инвалидирует кеш запроса профиля пользователя
export const useInvalidateProfile = () => {
  // Получаем экземпляр QueryClient из контекста
  const queryClient = useQueryClient();

  // Возвращаем функцию, которая принимает идентификатор пользователя и инвалидирует кеш запроса профиля пользователя
  return (userId: UserId) =>
    queryClient.invalidateQueries({
      // Ключ запроса состоит из базового ключа, типа запроса и идентификатора пользователя
      queryKey: [baseKey, 'getProfileById', userId],
    });
};
