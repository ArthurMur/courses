import { AuthorizationError } from '@/shared/lib/errors';
import { Profile, SessionEntity, UserId } from '../_domain/types';
import { createProfileAbility } from '../_domain/ability';
import { profileRepository } from '../_repositories/profile';

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  // Метод для обновления профиля пользователя
  async exec({ userId, session, data }: UpdateProfile): Promise<Profile> {
    // Создаем объект profileAbility для проверки прав доступа пользователя
    const profileAbility = createProfileAbility(session);

    // Если пользователь не имеет прав на обновление профиля, выбрасываем исключение AuthorizationError
    if (!profileAbility.canUpdateProfile(userId)) {
      throw new AuthorizationError();
    }

    // Обновляем профиль пользователя в базе данных и возвращаем обновленный профиль
    return await profileRepository.update(userId, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
