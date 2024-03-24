'use server';

import { z } from 'zod';
import { profileSchema } from '@/entities/user/_domain/schema';
import { getAppSessionStrictServer } from '@/kernel/lib/next-auth/server';
import { updateProfileService } from '@/entities/user/profile.server';

const propsSchema = z.object({
  userId: z.string(),
  data: profileSchema.partial(),
});

// Валидируем выходное значение
const resultSchema = z.object({
  profile: profileSchema,
});

// получение профиля пользователя
export const updateProfileAction = async (
  props: z.infer<typeof propsSchema>
) => {
  // Получение идентификатора пользователя из свойств
  const { userId, data } = propsSchema.parse(props);

  // Получение строгой сессии приложения
  const session = await getAppSessionStrictServer();

  // Использование GetUserService для получения профиля пользователя
  const user = await updateProfileService.exec({
    session,
    data,
    userId,
  });

  // Возвращение профиля пользователя, соответствующего resultSchema
  return resultSchema.parseAsync({ profile: user });
};
