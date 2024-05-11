import { CreateUserService } from '@/kernel/lib/next-auth/server';
import { ROLES, SharedUser } from '@/kernel/domain/user';
import { injectable } from 'inversify';
import { UserRepository } from '../_repositories/user';
import { AdapterUser } from 'next-auth/adapters';
import { privateConfig } from '@/shared/config/private';
import { createId } from '@/shared/lib/id';

@injectable()
export class CreateUserServiceImpl implements CreateUserService {
  constructor(private profileRepository: UserRepository) {} // Инъекция зависимости репозитория пользователя

  // Метод для создания пользователя
  async exec(data: Omit<AdapterUser, 'id'>): Promise<AdapterUser> {
    // Получаем список администраторов из приватной конфигурации
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(',') ?? [];

    // Определяем роль пользователя на основе его электронной почты
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    // Создаем объект пользователя
    const user: SharedUser = {
      id: createId(), // Создаем уникальный идентификатор
      ...data, // Копируем данные пользователя
      role, // Устанавливаем роль пользователя
    };

    // Создаем пользователя в репозитории
    const res = await this.profileRepository.create(user);

    // Возвращаем данные пользователя, с установкой статуса верификации электронной почты, если он не был задан
    return { ...res, emailVerified: res.emailVerified ?? null };
  }
}
