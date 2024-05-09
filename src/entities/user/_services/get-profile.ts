import { UserId, SharedSession } from '@/kernel/domain/user';
import { injectable } from 'inversify';
import { ProfileRepository } from '../_repositories/profile';
import { Profile } from '../client';

type GetUser = {
  userId: UserId;
  session: SharedSession;
};

// Проверка прав доступа
@injectable()
export class GetProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  // Получение профиля пользователя из хранилища пользователей.
  async exec({ userId }: GetUser): Promise<Profile> {
    // Вернуть профиль пользователя из хранилища пользователей
    return await this.profileRepository.getProfileByUserId(userId);
  }
}
