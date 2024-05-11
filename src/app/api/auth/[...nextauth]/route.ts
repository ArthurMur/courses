import { server } from '@/app/server';
import { NextAuthConfig } from '@/kernel/lib/next-auth/_next-auth-config';
import NextAuth from 'next-auth/next';

// Создание обработчика аутентификации NextAuth на основе конфигурации сервера
const authHandler = NextAuth(server.get(NextAuthConfig).options);

// Экспорт обработчика как обработчика GET и POST запросов
export { authHandler as GET, authHandler as POST };
