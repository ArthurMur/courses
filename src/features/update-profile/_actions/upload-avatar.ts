'use server';
import { z } from 'zod';
import { AVATAR_FILE_KEY } from '../_constants';
import { BadRequest } from '@/shared/lib/errors';
import { fileStorage } from '@/shared/lib/file-storage';

// Валидируем выходное значение
const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

// отправка файла аватара на сервер
export const uploadAvatarAction = async (formData: FormData) => {
  // Получаем файл из объекта FormData
  const file = formData.get(AVATAR_FILE_KEY);

  // Проверяем, является ли файл экземпляром класса File и если это не так, то бросаем ошибку BadRequest
  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await fileStorage.uploadImage(file, 'avatar');

  return resultSchema.parse({
    avatar: storedFile,
  });
};
