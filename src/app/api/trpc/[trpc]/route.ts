import 'reflect-metadata';

import {
  Controller,
  createContext,
  sharedRouter,
  t,
} from '@/kernel/lib/trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { init } from '@/app/_init';

const container = init();

const routers = container.getAll(Controller).map((c) => c.router);

// Обработчик запросов
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc', // Указание конечной точки API
    req, // Передача объекта запроса
    router: t.mergeRouters(sharedRouter, ...routers), // Использование объединенного роутера из контекста TRPC
    createContext: createContext, // Передача функции createContext для создания контекста
  });

// Экспорт обработчика как методов GET и POST
export { handler as GET, handler as POST };
