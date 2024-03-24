import { useMutation } from '@tanstack/react-query';
import { updateProfileAction } from '../_actions/update-profile';
import { useAppSession } from '@/kernel/lib/next-auth/client';
import { useInvalidateProfile } from '@/entities/user/_queries';

export const useUpdateProfile = () => {
  // Получаем функцию updateSession из хука useAppSession
  const { update: updateSession } = useAppSession();
  // Получаем функцию invalidateProfile из хука useInvalidateProfile
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    // Выполняем мутацию
    mutationFn: updateProfileAction,
    // onSuccess вызывается после успешного выполнения мутации
    async onSuccess({ profile }, { userId }) {
      // Инвалидируем кэш профиля пользователя с помощью функции invalidateProfile
      await invalidateProfile(userId);
      // Обновляем текущую сессию приложения с помощью функции updateSession
      await updateSession({ user: profile });
    },
  });

  // Возвращаем объект с функцией mutateAsync и флагом isPending
  return {
    update: mutateAsync,
    isPending,
  };
};
