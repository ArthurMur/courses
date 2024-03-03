import { dbClient } from '@/shared/lib/db';
import { UserEntity, UserId } from '../_domain/types';

export class UserRepository {
  // Получение ползователя по id
  async getUserById(userId: UserId): Promise<UserEntity> {
    return dbClient.user.findUniqueOrThrow({ where: { id: userId } }); // Возврат результата поиска пользователя по id с использованием dbClient
  }

  // Создание нового пользователя
  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dbClient.user.create({
      // Создание нового пользователя с использованием dbClient
      data: user,
    });
  }
}

export const userRepository = new UserRepository();
