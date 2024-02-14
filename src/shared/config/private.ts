import { z } from 'zod';

// Схема данных для приватной конфигурации
const privateConfigSchema = z.object({
  // Поле GITHUB_ID должно быть строкой, опциональное
  GITHUB_ID: z.string().optional(),
  // Поле GITHUB_SECRET должно быть строкой, опциональное
  GITHUB_SECRET: z.string().optional(),
});

// Парсинг приватной конфигурации из переменных среды с использованием заданной схемы данных
export const privateConfig = privateConfigSchema.parse(process.env);
