import { GetCoursesListService } from '@/entities/course/server';
import { GetMapNodesService } from '@/entities/map/server';
import { injectable } from 'inversify';
import { arrayToRecord } from '@/shared/lib/record';
import { CourseId } from '@/kernel/domain/course';
import { Course } from '@/entities/course';
import { CourseMapNode, MAP_NODE_TYPES } from '@/entities/map';

// Тип запроса для получения курсов
type GetCoursesToAddQuery = {
  notFilterCourseId?: CourseId; // Идентификатор курса для исключения из фильтрации
};

@injectable() // Декоратор для внедрения зависимостей
export class GetCoursesToAddService {
  constructor(
    private getCoursesListService: GetCoursesListService, // Сервис для получения списка курсов
    private getMapNodesService: GetMapNodesService // Сервис для получения узлов карты
  ) {}

  // Метод для выполнения запроса
  async exec(query: GetCoursesToAddQuery): Promise<Course[]> {
    // Получение списка курсов
    const courses = await this.getCoursesListService.exec();
    // Получение списка узлов карты
    const mapNodes = await this.getMapNodesService.exec();
    // Фильтрация узлов карты, чтобы оставить только узлы типа курса
    const coursesMapNodes = mapNodes.filter(
      (mapNode): mapNode is CourseMapNode =>
        mapNode.type === MAP_NODE_TYPES.COURSE
    );
    // Преобразование массива узлов карты в объект для быстрого поиска по идентификатору курса
    const mapNodesByCourseIdRecord = arrayToRecord('courseId', coursesMapNodes);

    // Фильтрация курсов, чтобы исключить уже добавленные на карту
    return courses.filter((course) => {
      if (query.notFilterCourseId && query.notFilterCourseId === course.id) {
        return true; // Курс, идентификатор которого указан в запросе, не исключается
      }
      return !mapNodesByCourseIdRecord[course.id]; // Исключаются курсы, которые уже добавлены на карту
    });
  }
}
