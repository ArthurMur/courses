import { z } from 'zod';

// Определение схемы данных для публичной конфигурации
const publicConfigSchema = z.object({
  isDev: z.boolean(), // должно быть логического типа
  PUBLIC_URL: z.string(), // должно быть строкового типа
});

// Парсинг публичной конфигурации с использованием определенной схемы
export const publicConfig = publicConfigSchema.parse({
  // Установка значения "isDev" в зависимости от режима окружения
  isDev: process.env.NODE_ENV === 'development', // Определение значения "isDev" в зависимости от переменной окружения NODE_ENV
  PUBLIC_URL: process.env.NEXT_PUBLIC_PUBLIC_URL, // Установка значения "PUBLIC_URL" из переменной окружения NEXT_PUBLIC_PUBLIC_URL
});
