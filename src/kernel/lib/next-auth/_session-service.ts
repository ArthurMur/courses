import { getServerSession } from 'next-auth';
import { NextAuthConfig } from './_next-auth-config';
import { injectable } from 'inversify';

@injectable()
export class SessionService {
  constructor(private nextAuthConfig: NextAuthConfig) {} // Внедрение зависимости конфигурации NextAuth

  // Метод для получения серверной сессии
  get() {
    return getServerSession(this.nextAuthConfig.options); // Возвращаем результат вызова функции для получения серверной сессии с использованием конфигурации NextAuth
  }
}
