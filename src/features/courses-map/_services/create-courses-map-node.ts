import { GetCourseByIdService } from '@/entities/course/server';
import {
  CreateMapNodeCommand,
  CreateMapNodeService,
} from '@/entities/map/server';
import { injectable } from 'inversify';
import { CoursesMapNode } from '../_domain/types';
import { createCourseNode } from '../_domain/factory';
import { TRPCError } from '@trpc/server';

export type CreateCoursesMapNodeCommand = CreateMapNodeCommand;

@injectable()
export class CreateCoursesMapNodeService {
  constructor(
    private getCourseByIdService: GetCourseByIdService, // Внедряем сервис для получения курса по идентификатору
    private createMapNodeService: CreateMapNodeService // Внедряем сервис для создания узла карты
  ) {}

  // Асинхронный метод для выполнения команды создания узла карты курса
  async exec(command: CreateCoursesMapNodeCommand): Promise<CoursesMapNode> {
    // Если тип команды "course"
    if (command.type === 'course') {
      // Получаем курс по его идентификатору
      const course = await this.getCourseByIdService.exec({
        id: command.courseId,
      });

      // Если курс не найден, выбрасываем ошибку
      if (!course) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Курс ${command.courseId} не найден`,
        });
      }

      // Создаем узел карты
      const mapNode = await this.createMapNodeService.exec(command);

      // Если тип узла не является "course", выбрасываем ошибку
      if (mapNode.type !== 'course') {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // Создаем узел карты курса и возвращаем его
      return createCourseNode(mapNode, course);
    }

    // Если тип команды не "course", создаем обычный узел карты
    const node = await this.createMapNodeService.exec(command);

    // Если тип узла не является "image", выбрасываем ошибку
    if (node.type !== 'image') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }

    // Возвращаем созданный узел карты
    return node;
  }
}
