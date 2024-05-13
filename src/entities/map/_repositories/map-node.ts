import { injectable } from 'inversify';
import { MAP_NODE_TYPES, MapNode } from '../_domain/types';
import { dbClient } from '@/shared/lib/db';
import { MapNodeId } from '@/kernel/domain/map';

@injectable()
export class MapNodeRepository {
  constructor() {} // Конструктор класса

  // Метод для получения списка узлов карты
  async getList() {
    const mapNodes = await this.queryMapNodesList(); // Запрос на получение списка узлов карты из базы данных
    // Преобразование полученных узлов карты в объекты сущностей и возвращение результата
    return mapNodes.map((node) => this.mapNodeToEntity(node));
  }

  // Метод для получения узла карты по его идентификатору
  async getNodeById(id: MapNodeId) {
    const node = await this.queryMapNodeById(id); // Запрос на получение узла карты из базы данных по его идентификатору
    // Если узел не найден, возвращается undefined
    if (!node) {
      return undefined;
    }
    // Преобразование полученного узла карты в объект сущности и возвращение результата
    return this.mapNodeToEntity(node);
  }

  // Приватный метод для преобразования узла карты в объект сущности
  private mapNodeToEntity({
    id,
    imageData,
    courseData,
    ...nodeBase
  }: Awaited<ReturnType<typeof this.queryMapNodesList>>[number]): MapNode {
    const zIndex = nodeBase.zIndex ?? undefined;

    // Если узел содержит изображение, создается объект с типом IMAGE
    if (imageData) {
      return {
        id,
        ...nodeBase,
        zIndex,
        type: MAP_NODE_TYPES.IMAGE,
        src: imageData.src,
      };
    }

    // Если узел содержит данные о курсе, создается объект с типом COURSE
    if (courseData) {
      return {
        id,
        ...nodeBase,
        zIndex,
        type: MAP_NODE_TYPES.COURSE,
        courseId: courseData.courseId,
      };
    }

    // Если тип узла неизвестен, генерируется исключение
    throw new Error('Unknown map node type');
  }

  // Приватный метод для запроса узла карты из базы данных по его идентификатору
  private queryMapNodeById(id: MapNodeId) {
    return dbClient.mapNode.findUnique({
      where: { id },
      include: {
        imageData: true,
        courseData: true,
      },
    });
  }

  // Приватный метод для запроса списка узлов карты из базы данных
  private queryMapNodesList() {
    return dbClient.mapNode.findMany({
      include: {
        imageData: true,
        courseData: true,
      },
    });
  }
}
