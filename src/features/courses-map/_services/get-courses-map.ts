import { GetCoursesListService } from '@/entities/course/server';
import { GetMapNodesService } from '@/entities/map/server';
import { injectable } from 'inversify';
import { CoursesMapNode } from '../_domain/types';
import { arrayToRecord } from '@/shared/lib/record';
import { createCourseNode } from '../_domain/factory';
import { isDefined } from '@/shared/lib/assert';

@injectable()
export class GetCoursesMapService {
  constructor(
    // Внедрение зависимостей: сервисы получения списка курсов и узлов карты
    private getCoursesListService: GetCoursesListService,
    private getMapNodesService: GetMapNodesService
  ) {}

  // Метод exec асинхронно выполняет запросы к сервисам и возвращает список узлов карты
  async exec(): Promise<CoursesMapNode[]> {
    // Получение списка курсов
    const courses = await this.getCoursesListService.exec();

    // Преобразование массива курсов в объект, индексированный по идентификаторам курсов
    const coursesRecord = arrayToRecord('id', courses);

    // Получение списка узлов карты
    const mapNodes = await this.getMapNodesService.exec();

    // Преобразование узлов карты в соответствующие типы данных
    return mapNodes
      .map((mapNode) => {
        // Если тип узла - "курс", создается соответствующий узел курса с данными курса из списка курсов
        if (mapNode.type === 'course') {
          const course = coursesRecord[mapNode.courseId];
          if (!course) return; // Если курс не найден, возвращается undefined
          return createCourseNode(mapNode, course);
        }

        // Если тип узла - "изображение", узел остается без изменений
        if (mapNode.type === 'image') {
          return mapNode;
        }

        return undefined; // Возвращение undefined для неизвестного типа узла
      })
      .filter(isDefined); // Фильтрация узлов карты, оставляя только определенные значения
  }
}
