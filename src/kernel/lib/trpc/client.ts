import { CreateTRPCReact, createTRPCReact } from '@trpc/react-query';
import { SharedRouter } from './server'; // Импорт общего роутера
import { AnyRouter } from '@trpc/server'; // Импорт общего роутера из серверной части TRPC

// Создание общего API на основе роутера
export const sharedApi = createTRPCReact<SharedRouter>();

// Функция для создания API с указанным роутером
export const createApi = <T extends AnyRouter>() =>
  sharedApi as CreateTRPCReact<T, unknown>; // Приведение общего API к типу, соответствующему переданному роутеру
