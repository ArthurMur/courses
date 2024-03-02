import { ROLES, SessionEntity, UserId } from './types';

// Cоздает возможность пользователя на основе сущности сеанса.
export const createUserAbility = (session: SessionEntity) => ({
  // Cоответствует ли идентификатор пользователя сеанса переданному идентификатору пользователя или является ли роль пользователя администратором.
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
