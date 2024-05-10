'use client';
import { useQuery } from '@tanstack/react-query';
import { ProfileForm } from './_ui/profile-form';
import { Spinner } from '@/shared/ui/spinner';
import { useRouter } from 'next/navigation';
import { updateProfileApi } from './_api';

// Компонент формы для обновления профиля пользователя
export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const router = useRouter();
  const profileQuery = updateProfileApi.updateProfile.get.useQuery({ userId }); // получаем данные профиля пользователя

  // функция для обработки успешного обновления профиля
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl); // перенаправляем на callbackUrl, если он был передан
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />; // отображаем Spinner при загрузке профиля
  }

  if (!profileQuery.data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>; // отображаем сообщение об ошибке, если профиль не может быть загружен
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? 'Продолжить' : 'Сохранить'}
    />
  );
}
