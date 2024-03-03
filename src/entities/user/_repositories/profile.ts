import { dbClient } from '@/shared/lib/db';
import { Profile, UserId } from '../_domain/types';

export class ProfileRepository {
  // Метод для обновления профиля пользователя
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    // Обновляем профиль пользователя в базе данных с помощью dbClient
    return await dbClient.user.update({
      // Выбираем пользователя по id
      where: { id: userId },
      // Обновляем данные профиля
      data,
    });
  }
}

export const profileRepository = new ProfileRepository();
