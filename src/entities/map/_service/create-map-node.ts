import { injectable } from 'inversify';
import { MapNodeRepository } from '../_repositories/map-node';
import {
  CourseMapNodeData,
  ImageMapNodeData,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
  MapNode,
} from '../_domain/types';
import { createId } from '@/shared/lib/id';
import { getZIndex } from '../_domain/methods';

// Определяем тип данных для команды создания узла карты
export type CreateMapNodeCommand = (MapNodeDimensions &
  MapNodePosition &
  MapNodeSettings) &
  (CourseMapNodeData | ImageMapNodeData);

@injectable()
export class CreateMapNodeService {
  constructor(private mapNodeRepository: MapNodeRepository) {} // Инициализируем сервис с репозиторием для работы с узлами карты

  // Асинхронный метод для выполнения команды создания узла карты
  async exec(command: CreateMapNodeCommand) {
    // Создаем объект узла карты, включая его id и другие данные из команды,
    // затем вычисляем и присваиваем z-index
    const mapNode: MapNode = {
      id: createId(),
      ...command,
      zIndex: getZIndex(command.type, command.zIndex),
    };

    // Сохраняем созданный узел карты и возвращаем его
    return await this.mapNodeRepository.saveNode(mapNode);
  }
}
