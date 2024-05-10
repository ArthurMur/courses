import { useAppSession } from '@/kernel/lib/next-auth/client';
import { updateProfileApi } from '../_api';

// Хук для обновления профиля
export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession(); // Получаем функцию обновления сессии из хука
  const utils = updateProfileApi.useUtils(); // Получаем утилиты из API для обновления профиля
  const { mutateAsync, isPending } =
    updateProfileApi.updateProfile.update.useMutation({
      // Получаем функцию для мутации профиля и статус ожидания из API
      async onSuccess(profile, { userId }) {
        // Функция, вызываемая после успешного обновления профиля
        await utils.updateProfile.get.invalidate({ userId }); // Недействительность кэша профиля для обновленного пользователя
        await updateSession({ user: profile }); // Обновление сессии с обновленными данными пользователя
      },
    });

  return {
    update: mutateAsync, // Функция для обновления профиля
    isPending, // Статус ожидания обновления профиля
  };
};
