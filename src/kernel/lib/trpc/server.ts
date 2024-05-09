import { AnyRouter, TRPCError, initTRPC } from '@trpc/server';
import { getAppSessionServer } from '../next-auth/server';
import { SharedSession } from '@/kernel/domain/user';
import { ZodTypeAny, z } from 'zod';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { injectable } from 'inversify';

@injectable()
export abstract class Controller {
  abstract router: AnyRouter;
}

// Функция создания контекста для TRPC
export const createContext = async () => {
  // Получение сеанса приложения
  const session = await getAppSessionServer();

  return {
    session,
  };
};

// Инициализация TRPC контекста и создание объекта t
export const t = initTRPC.context<typeof createContext>().create();

// Экспорт роутера и процедур
export const router = t.router;
export const publicProcedure = t.procedure;

// Процедура для авторизации
export const authorizedProcedure = t.procedure.use(({ ctx, next }) => {
  // Проверка наличия сеанса
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  // Передача управления следующему обработчику с учетом сеанса
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

// Процедура для проверки доступа пользователя к определенным действиям
export const checkAbilityProcedure = <Ability>({
  check,
  create,
}: {
  check?: (ability: Ability) => boolean; // Функция проверки доступа
  create: (session: SharedSession) => Ability; // Функция создания объекта доступа на основе сессии
}) =>
  authorizedProcedure.use(({ ctx, next }) => {
    const ability = create(ctx.session); // Создание объекта доступа на основе текущей сессии пользователя

    // Проверка доступа пользователя
    if (check && !check(ability)) {
      // Если доступ запрещен, выбрасывается исключение "FORBIDDEN"
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    // Если доступ разрешен, передается управление следующей функции в цепочке процедур
    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });

// Процедура для проверки доступа пользователя к определенным действиям с учетом входных данных
export const checkAbilityInputProcedure = <Ability, Input extends ZodTypeAny>({
  check,
  create,
  input,
}: {
  input: Input; // Тип входных данных
  check: (ability: Ability, input: z.infer<Input>) => boolean; // Функция проверки доступа с учетом входных данных
  create: (session: SharedSession) => Ability; // Функция создания объекта доступа на основе сессии
}) =>
  authorizedProcedure.input(input).use(({ ctx, next, input: params }) => {
    const ability = create(ctx.session); // Создание объекта доступа на основе текущей сессии пользователя

    // Проверка доступа пользователя с учетом входных данных
    if (!check(ability, params)) {
      // Если доступ запрещен, выбрасывается исключение "FORBIDDEN"
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    // Если доступ разрешен, передается управление следующей функции в цепочке процедур
    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });

// Общий роутер
export const sharedRouter = router({});
export type SharedRouter = typeof sharedRouter;

// Функция для создания общего публичного серверного API
export const createPublicServerApi = <T extends AnyRouter>(router: T) =>
  createServerSideHelpers<T>({
    router: router,
    ctx: () => ({}),
  } as any);
