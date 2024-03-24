import { AuthorizationError } from '@/shared/lib/errors';
import { UserId, SharedSession, SharedUser } from '@/kernel/domain/user';
import { createUserAbility } from '../_domain/ability';
import { userRepository } from '../_repositories/user';

type GetUser = {
  userId: UserId;
  session: SharedSession;
};

// Проверка прав доступа
export class GetUserService {
  // Получение профиля пользователя из хранилища пользователей.
  async exec({ userId, session }: GetUser): Promise<SharedUser> {
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
