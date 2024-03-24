import { SharedSession, UserId, ROLES } from '@/kernel/domain/user';

// Создание функции для проверки прав доступа пользователя на основе сессии
export const createUserAbility = (session: SharedSession) => ({
  // Проверка права на получение информации о пользователе
  canGetUser: (userId: UserId) =>
    // Пользователь может получить информацию о себе или он является администратором
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});

// Создание функции для проверки прав доступа пользователя на основе сессии
export const createProfileAbility = (session: SharedSession) => ({
  // Проверка права на обновление профиля
  canUpdateProfile: (userId: UserId) =>
    // Пользователь может обновить свой профиль или он является администратором
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
