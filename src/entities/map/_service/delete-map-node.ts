import { injectable } from 'inversify';
import { TRPCError } from '@trpc/server';
import { MapNodeId } from '@/kernel/domain/map';
import { MapNodeRepository } from '../_repositories/map-node';

// Определяем тип команды для удаления узла на карте.
type DeleteMapNodeCommand = {
  id: MapNodeId;
};

@injectable()
export class DeleteMapNodeService {
  constructor(private mapNodeRepository: MapNodeRepository) {}

  // Асинхронный метод для выполнения команды удаления узла.
  async exec(command: DeleteMapNodeCommand) {
    // Получаем узел по его id из репозитория.
    const node = await this.mapNodeRepository.getNodeById(command.id);

    // Если узел не найден, выбрасываем ошибку BAD_REQUEST.
    if (!node) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Узел карты ${command.id} не найден`,
      });
    }

    // Удаляем узел из репозитория.
    await this.mapNodeRepository.deleteNode(command.id);
  }
}
