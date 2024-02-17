export type UserId = string;
export type Role = 'ADMIN' | 'USER';

export const ROLES: Record<Role, Role> = {
  ADMIN: 'ADMIN', // Роль админа
  USER: 'USER', // Роль пользователя
};

export type UserEntity = {
  id: UserId; // Идентификатор пользователя
  email: string; // Почта пользователя
  role: Role; // Роль пользователя
  emailVerified?: Date | null; // Дата подтверждения почты, может быть null
  name?: string | null; // Имя пользователя, может быть null
  image?: string | null; // Ссылка на изображение пользователя, может быть null
};

export type SessionEntity = {
  user: {
    id: UserId; // Идентификатор пользователя
    email: string; // Почта пользователя
    role: Role; // Роль пользователя
    name?: string | null; // Имя пользователя, может быть null
    image?: string | null; // Ссылка на изображение пользователя, может быть null
  };
  expires: string; // Дата и время истечения сессии
};
