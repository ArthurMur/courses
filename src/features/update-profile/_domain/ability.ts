import { SharedSession, UserId, ROLES } from '@/kernel/domain/user';

// Создание возможностей для управления профилями
export const createProfileAbility = (session: SharedSession) => ({
  // Может ли пользователь обновлять профиль
  canUpdateProfile: (userId: UserId) =>
    // Проверка, является ли текущий пользователь владельцем профиля или администратором
    session.user.id === userId || session.user.role === ROLES.ADMIN,

  // Может ли пользователь получать профиль
  canGetProfile: (userId: UserId) =>
    // Проверка, является ли текущий пользователь владельцем профиля или администратором
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
