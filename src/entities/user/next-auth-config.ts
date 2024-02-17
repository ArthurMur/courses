import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { dbClient } from '@/shared/lib/db';
import { compact } from 'lodash-es';
import { privateConfig } from '@/shared/config/private';
import { createUserUseCase } from './_use-cases/create-user';

const prismaAdapter = PrismaAdapter(dbClient);

// Конфигурация аутентификации NextAuth
export const nextAuthConfig: AuthOptions = {
  // Установка адаптера для работы с базой данных
  adapter: {
    // Переопределям адаптер на свой createUser
    ...prismaAdapter,
    createUser: (user) => {
      return createUserUseCase.exec(user);
    },
  } as AuthOptions['adapter'],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/new-user',
    verifyRequest: '/auth/verify-request',
  },
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
