import {
  CreateTRPCClient,
  createTRPCClient,
  httpBatchLink,
} from '@trpc/client';
import { CreateTRPCReact, createTRPCReact } from '@trpc/react-query';
import { SharedRouter } from './server'; // Импорт общего роутера
import { AnyRouter } from '@trpc/server'; // Импорт общего роутера из серверной части TRPC
import { publicConfig } from '@/shared/config/public';

// Создание общего API на основе роутера
export const sharedApi = createTRPCReact<SharedRouter>();

// Функция для создания API с указанным роутером
export const createApi = <T extends AnyRouter>() =>
  sharedApi as CreateTRPCReact<T, unknown>; // Приведение общего API к типу, соответствующему переданному роутеру

export const sharedHttpApi = createTRPCClient<SharedRouter>({
  links: [
    httpBatchLink({
      url: `${publicConfig.PUBLIC_URL}/api/trpc`,
    }),
  ],
});

export const createHttpApi = <T extends AnyRouter>() =>
  sharedHttpApi as CreateTRPCClient<T>;
