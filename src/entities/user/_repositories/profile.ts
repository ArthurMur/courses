import { dbClient } from '@/shared/lib/db';
import { Profile } from '../_domain/types';
import { UserId } from '@/kernel/domain/user';
import { profileSchema } from '../client';
import { z } from 'zod';
import { injectable } from 'inversify';

@injectable()
export class ProfileRepository {
  // Метод для обновления профиля пользователя
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    // Обновляем профиль пользователя в базе данных с помощью dbClient
    const user = await dbClient.user.update({
      // Выбираем пользователя по id
      where: { id: userId },
      // Обновляем данные профиля
      data,
    });

    return profileSchema.parse(user satisfies z.input<typeof profileSchema>);
  }

  async getProfileByUserId(userId: UserId): Promise<Profile> {
    const user = await dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    return profileSchema.parse(user satisfies z.input<typeof profileSchema>);
  }
}
