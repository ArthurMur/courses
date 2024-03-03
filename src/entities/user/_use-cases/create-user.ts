import { ROLES, UserEntity } from '../_domain/types';
import { createId } from '@/shared/lib/id';
import { userRepository } from '../_repositories/user';
import { privateConfig } from '@/shared/config/private';

type CreateUser = {
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null; // Дата подтверждения почты, может быть null
};

// Класс для выполнения операции создания пользователя
export class CreateUserUseCase {
  async exec(data: CreateUser) {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(',') ?? []; // Получаем список администраторских email из приватной конфигурации, если они есть, иначе создаем пустой массив
    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER; // Проверяем, является ли email пользователя администраторским, и устанавливаем соответствующую роль

    // Создаем объект пользователя с помощью данных и уникального идентификатора
    const user: UserEntity = {
      id: createId(), // Генерируем уникальный идентификатор
      role, // Устанавливаем роль пользователя
      ...data, // Добавляем остальные данные из входного объекта
    };

    // Вызываем метод создания пользователя
    return await userRepository.createUser(user);
  }
}

export const createUserUseCase = new CreateUserUseCase();
