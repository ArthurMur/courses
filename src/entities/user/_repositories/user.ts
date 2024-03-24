import { UserId, SharedUser } from '@/kernel/domain/user';
import { dbClient } from '@/shared/lib/db';

export class UserRepository {
  // Получение ползователя по id
  async getUserById(userId: UserId): Promise<SharedUser> {
    return dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }
}

export const userRepository = new UserRepository();
