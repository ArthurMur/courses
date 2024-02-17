import { useAppSession } from './use-app-session';

export const useRole = () => {
  const session = useAppSession(); // Получение сессии

  return session?.data?.user.role; // Возврат роли пользователя из данных сессии, если она существует
};
