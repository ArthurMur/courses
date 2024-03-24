'use server';
import { z } from 'zod';
import { getUserService } from '../_services/get-user';
import { getAppSessionStrictServer } from '../session.server';
import { profileSchema } from '../_domain/schema';

const propsSchema = z.object({
  userId: z.string(),
});

// Валидируем выходное значение
const resultSchema = z.object({
  profile: profileSchema,
});

// получение профиля пользователя
export const getUserProfileAction = async (
  props: z.infer<typeof propsSchema>
) => {
  // Получение идентификатора пользователя из свойств
  const { userId } = propsSchema.parse(props);

  // Получение строгой сессии приложения
  const session = await getAppSessionStrictServer();

  // Использование GetUserService для получения профиля пользователя
  const user = await getUserService.exec({
    session,
    userId,
  });

  // Возвращение профиля пользователя, соответствующего resultSchema
  return resultSchema.parseAsync({ profile: user });
};
