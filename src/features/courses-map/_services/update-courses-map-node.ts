import { GetCourseByIdService } from '@/entities/course/server';
import {
  UpdateMapNodeCommand,
  UpdateMapNodeService,
} from '@/entities/map/server';
import { injectable } from 'inversify';
import { CoursesMapNode } from '../_domain/types';
import { createCourseNode } from '../_domain/factory';
import { TRPCError } from '@trpc/server';
import { Course } from '@/entities/course';

export type UpdateCoursesMapNodeCommand = UpdateMapNodeCommand;

@injectable()
export class UpdateCoursesMapNodeService {
  constructor(
    private getCourseByIdService: GetCourseByIdService, // Внедряем сервис для получения курса по идентификатору
    private updateMapNodeService: UpdateMapNodeService // Внедряем сервис для обновления узла карты
  ) {}

  // Асинхронный метод для выполнения команды обновления узла карты курса
  async exec(command: UpdateCoursesMapNodeCommand): Promise<CoursesMapNode> {
    let course: Course | undefined = undefined;

    // Если тип команды "course" и определен идентификатор курса
    if (command.type && command.type === 'course' && command.courseId) {
      // Получаем курс по его идентификатору
      course = await this.getCourseByIdService.exec({
        id: command.courseId,
      });

      // Если курс не найден, выбрасываем ошибку
      if (!course) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Курс ${command.courseId} не найден`,
        });
      }
    }

    // Обновляем узел карты
    const mapNode = await this.updateMapNodeService.exec(command);

    // Если тип узла "course"
    if (mapNode.type === 'course') {
      // Если курс не был определен ранее, пытаемся его получить
      course ??= await this.getCourseByIdService.exec({
        id: mapNode.courseId,
      });

      // Если курс все еще не найден, выбрасываем ошибку
      if (!course) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // Создаем узел карты курса и возвращаем его
      return createCourseNode(mapNode, course);
    }

    // Возвращаем обновленный узел карты
    return mapNode;
  }
}
