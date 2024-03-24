import { AuthorizationError } from '@/shared/lib/errors';
import { SessionEntity, UserEntity, UserId } from '../_domain/types';
import { createUserAbility } from '../_domain/ability';
import { userRepository } from '../_repositories/user';

type GetUser = {
  userId: UserId;
  session: SessionEntity;
};

// Проверка прав доступа
export class GetUserService {
  // Получение профиля пользователя из хранилища пользователей.
  async exec({ userId, session }: GetUser): Promise<UserEntity> {
    // Пользовательская способность на основе сеанса
    const userAbility = createUserAbility(session);

    // Ошибка авторизации, если пользователь не имеет прав на получение профиля
    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizationError();
    }
    // Вернуть профиль пользователя из хранилища пользователей
    return await userRepository.getUserById(userId);
  }
}

export const getUserService = new GetUserService();
