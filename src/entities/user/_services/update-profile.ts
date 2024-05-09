import { Profile } from '../_domain/types';
import { UserId, SharedSession } from '@/kernel/domain/user';
import { injectable } from 'inversify';
import { ProfileRepository } from '../_repositories/profile';

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SharedSession;
};

@injectable()
export class UpdateProfileService {
  constructor(private profileRepository: ProfileRepository) {}
  // Метод для обновления профиля пользователя
  async exec({ userId, data }: UpdateProfile): Promise<Profile> {
    // Обновляем профиль пользователя в базе данных и возвращаем обновленный профиль
    return await this.profileRepository.update(userId, data);
  }
}
