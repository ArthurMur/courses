import { AnyRouter, TRPCError, initTRPC } from '@trpc/server';
import { SharedSession } from '@/kernel/domain/user';
import { ZodTypeAny, z } from 'zod';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { ContextFactory } from './_context-factory';

// Инициализация TRPC
export const t = initTRPC.context<ContextFactory['createContext']>().create();

// Экспорт роутера и процедур
export const router = t.router;
export const publicProcedure = t.procedure;

// Процедура для авторизации
export const authorizedProcedure = t.procedure.use(({ ctx, next }) => {
  // Проверяем, что есть сессия
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  // Если есть сессия, передаем дальше
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

// Процедура для проверки способности выполнения действия
export const checkAbilityProcedure = <Ability>({
  check,
  create,
}: {
  check?: (ability: Ability) => boolean;
  create: (session: SharedSession) => Ability;
}) =>
  authorizedProcedure.use(({ ctx, next }) => {
    const ability = create(ctx.session);

    if (check && !check(ability)) {
      // Если проверка не проходит, выбрасываем ошибку
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    // Если проверка успешна, передаем дальше
    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });

// Процедура для проверки способности с входными параметрами
export const checkAbilityInputProcedure = <Ability, Input extends ZodTypeAny>({
  check,
  create,
  input,
}: {
  input: Input;
  check: (ability: Ability, input: z.infer<Input>) => boolean;
  create: (session: SharedSession) => Ability;
}) =>
  authorizedProcedure.input(input).use(({ ctx, next, input: params }) => {
    const ability = create(ctx.session);

    if (!check(ability, params)) {
      // Если проверка не проходит, выбрасываем ошибку
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    // Если проверка успешна, передаем дальше
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

// Создание публичного серверного API
export const createPublicServerApi = <T extends AnyRouter>(router: T) =>
  createServerSideHelpers<T>({
    router: router,
    ctx: () => ({}),
  } as any);
