import { ContainerModule } from 'inversify';
import { UpdateProfileController } from './_controller';
import { Controller } from '@/kernel/lib/trpc/server';

// Создаем модуль Inversify для обновления профиля
export const UpdateProfileModule = new ContainerModule((bind) => {
  // Связываем контроллер обновления профиля с интерфейсом контроллера
  bind(Controller).to(UpdateProfileController);
});
