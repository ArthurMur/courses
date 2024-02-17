'use server';
import { getServerSession } from 'next-auth';
import { nextAuthConfig } from './next-auth-config';

// Функция для получения сессии приложения на сервере
export const getAppSessionServer = () => getServerSession(nextAuthConfig);
