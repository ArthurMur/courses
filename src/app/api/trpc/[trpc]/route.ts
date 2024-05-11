import { server } from '@/app/server';
import {
  ContextFactory,
  Controller,
  sharedRouter,
  t,
} from '@/kernel/lib/trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const routers = server.getAll(Controller).map((c) => c.router);

// Обработчик запросов
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc', // Указание конечной точки API
    req, // Передача объекта запроса
    router: t.mergeRouters(sharedRouter, ...routers), // Использование объединенного роутера из контекста TRPC
    createContext: server.get(ContextFactory).createContext, // Передача createContext для создания контекста
  });

// Экспорт обработчика как методов GET и POST
export { handler as GET, handler as POST };
