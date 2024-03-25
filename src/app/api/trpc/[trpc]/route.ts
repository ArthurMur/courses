import 'reflect-metadata';

import { coursesListController } from '@/features/courses-list/controller';
import { createContext, sharedRouter, t } from '@/kernel/lib/trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// Обработчик запросов
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc', // Указание конечной точки API
    req, // Передача объекта запроса
    router: t.mergeRouters(sharedRouter, coursesListController), // Использование объединенного роутера из контекста TRPC
    createContext: createContext, // Передача функции createContext для создания контекста
  });

// Экспорт обработчика как методов GET и POST
export { handler as GET, handler as POST };
