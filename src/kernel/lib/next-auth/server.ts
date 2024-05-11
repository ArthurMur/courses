import { ContainerModule } from 'inversify';
import { NextAuthConfig } from './_next-auth-config';
import { SessionService } from './_session-service';

// Создание модуля Inversify для NextAuth
export const NextAuthModule = new ContainerModule((bind) => {
  // Привязка конфигурации NextAuth и сервиса сессии себе
  bind(NextAuthConfig).toSelf();
  bind(SessionService).toSelf();
});

export { NextAuthConfig, SessionService };
