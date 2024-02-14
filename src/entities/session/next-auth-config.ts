import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { dbClient } from '@/shared/lib/db';
import { compact } from 'lodash-es';
import { privateConfig } from '@/shared/config/private';

// Конфигурация аутентификации NextAuth
export const nextAuthConfig: AuthOptions = {
  // Установка адаптера для работы с базой данных
  adapter: PrismaAdapter(dbClient) as AuthOptions['adapter'],
  // Поставщики аутентификации, созданные на основе приватной конфигурации Github
  providers: compact([
    EmailProvider({
      server: {
        host: privateConfig.EMAIL_SERVER_HOST, // Хост сервера электронной почты
        port: privateConfig.EMAIL_SERVER_PORT, // Порт сервера электронной почты
        auth: {
          user: privateConfig.EMAIL_SERVER_USER, // Пользователь сервера электронной почты
          pass: privateConfig.EMAIL_SERVER_PASSWORD, // Пароль сервера электронной почты
        },
      },
      from: privateConfig.EMAIL_FROM, // Электронный адрес отправителя
    }),
    privateConfig.GITHUB_ID && // Проверка наличия идентификатора Github в приватной конфигурации
      privateConfig.GITHUB_SECRET && // Проверка наличия секретного ключа Github в приватной конфигурации
      // Создание провайдера Github
      GithubProvider({
        clientId: privateConfig.GITHUB_ID, // Идентификатор приложения Github
        clientSecret: privateConfig.GITHUB_SECRET, // Секретный ключ приложения Github
      }),
  ]),
};
