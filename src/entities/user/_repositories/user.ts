import { dbClient } from '@/shared/lib/db';
import { SharedUser } from '@/kernel/domain/user';
import { injectable } from 'inversify';

@injectable()
export class UserRepository {
  // Метод для создания пользователя
  async create(createData: SharedUser): Promise<SharedUser> {
    // Создаем пользователя в базе данных
    const user = dbClient.user.create({
      data: createData,
    });

    // Возвращаем созданного пользователя
    return user;
  }
}
