'use server';
import { getServerSession } from 'next-auth';
import { nextAuthConfig } from './next-auth-config';
import { NeedAuthError } from '@/shared/lib/errors';

// Функция для получения сессии приложения на сервере
export const getAppSessionServer = () => getServerSession(nextAuthConfig);
export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
