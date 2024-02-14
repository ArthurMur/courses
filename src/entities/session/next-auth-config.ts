import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
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
    privateConfig.GITHUB_ID && // Проверка наличия идентификатора Github в приватной конфигурации
      privateConfig.GITHUB_SECRET && // Проверка наличия секретного ключа Github в приватной конфигурации
      GithubProvider({
        // Создание провайдера Github
        clientId: privateConfig.GITHUB_ID, // Идентификатор приложения Github
        clientSecret: privateConfig.GITHUB_SECRET, // Секретный ключ приложения Github
      }),
  ]),
};
