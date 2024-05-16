import { injectable } from 'inversify';
import { MapNodeRepository } from '../_repositories/map-node';
import { MapNode } from '../_domain/types';
import { MapNodeId } from '@/kernel/domain/map';
import { TRPCError } from '@trpc/server';

// Определяем тип данных для команды обновления узла карты, который включает идентификатор и часть данных для обновления
export type UpdateMapNodeCommand = { id: MapNodeId } & Partial<MapNode>;

@injectable()
export class UpdateMapNodeService {
  constructor(private mapNodeRepository: MapNodeRepository) {} // Инициализируем сервис с репозиторием для работы с узлами карты

  // Асинхронный метод для выполнения команды обновления узла карты
  async exec({ id, ...data }: UpdateMapNodeCommand) {
    // Получаем узел карты по его идентификатору
    const node = await this.mapNodeRepository.getNodeById(id);
    // Если узел не найден, выбрасываем исключение с кодом ошибки и сообщением
    if (!node) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Узел карты ${id} не найден`,
      });
    }

    // Если в данных есть информация о типе узла и он отличается от текущего типа узла, выбрасываем исключение
    if (data.type && data.type !== node.type) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Невозможно изменить тип узла`,
      });
    }

    // Создаем объект узла карты, объединяя существующие данные с новыми данными
    const mapNode: MapNode = {
      ...node,
      ...(data as MapNode),
    };

    // Сохраняем обновленный узел карты и возвращаем его
    return await this.mapNodeRepository.saveNode(mapNode);
  }
}
