import {
  GetProfileService,
  UpdateProfileService,
} from '@/entities/user/server';
import {
  router,
  Controller,
  checkAbilityInputProcedure,
} from '@/kernel/lib/trpc/server';
import { injectable } from 'inversify';
import { createProfileAbility } from './_domain/ability';
import { z } from 'zod';
import { profileSchema } from '@/entities/user/client';

// Схема для проверки наличия userId
const withUserIdSchema = z.object({
  userId: z.string(), // Проверяем, что userId является строкой
});

@injectable()
export class UpdateProfileController extends Controller {
  constructor(
    private updateProfileService: UpdateProfileService, // Внедряем сервис для обновления профиля
    private getProfileService: GetProfileService // Внедряем сервис для получения профиля
  ) {
    super();
  }

  public router = router({
    updateProfile: router({
      // Маршрут для получения профиля
      get: checkAbilityInputProcedure({
        create: createProfileAbility, // Создаем возможности для управления профилями
        input: withUserIdSchema, // Проверяем входные данные с помощью схемы с userId
        check: (ability, data) => ability.canGetProfile(data.userId), // Проверяем, может ли пользователь получить профиль
      })
        .input(withUserIdSchema) // Указываем входные данные для маршрута
        .query(({ input }) => {
          return this.getProfileService.exec(input); // Выполняем сервис для получения профиля с заданными входными данными
        }),

      // Маршрут для обновления профиля
      update: checkAbilityInputProcedure({
        create: createProfileAbility, // Создаем возможности для управления профилями
        input: withUserIdSchema, // Проверяем входные данные с помощью схемы с userId
        check: (ability, data) => ability.canUpdateProfile(data.userId), // Проверяем, может ли пользователь обновить профиль
      })
        .input(
          // Расширяем схему с данными профиля для обновления
          withUserIdSchema.extend({
            data: profileSchema.partial(), // Принимаем частичные данные профиля для обновления
          })
        )
        .mutation(({ input }) => {
          return this.updateProfileService.exec(input); // Выполняем сервис для обновления профиля с заданными входными данными
        }),
    }),
  });
}
