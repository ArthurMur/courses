import { ContextFactory } from './_context-factory';
import { ContainerModule } from 'inversify';

// Экспорт функций и классов из файла с процедурами
export {
  authorizedProcedure,
  sharedRouter,
  createPublicServerApi,
  checkAbilityInputProcedure,
  checkAbilityProcedure,
  publicProcedure,
  router,
  t,
  type SharedRouter,
} from './_procedure';

// Экспорт класса контроллера
export { Controller } from './_controller';

// Создание модуля Inversify для TrpcModule
export const TrpcModule = new ContainerModule((bind) => {
  bind(ContextFactory).toSelf(); // Привязка фабрики контекста к самой себе
});

// Экспорт фабрики контекста
export { ContextFactory };
