import {
  CreateMapNodeService,
  DeleteMapNodeService,
  UpdateMapNodeService,
} from '@/entities/map/server';
import {
  router,
  Controller,
  publicProcedure,
  checkAbilityProcedure,
} from '@/kernel/lib/trpc/server';
import { injectable } from 'inversify';
import { createCoursesMapAbility } from './_domain/ability';
import { revalidatePath } from 'next/cache';
import {
  createCourseNodeCommandSchema,
  mapNodeIdSchema,
  updateCourseNodeCommandSchema,
} from './_domain/schema';
import { z } from 'zod';
import { GetCoursesMapService } from './_services/get-courses-map';
import { GetCoursesToAddService } from './_services/get-courses-to-add';

// Контроллер для работы с картой курсов.
@injectable()
export class CoursesMapController extends Controller {
  constructor(
    private getCoursesMapService: GetCoursesMapService,
    private deleteMapNodeService: DeleteMapNodeService,
    private createMapNodeService: CreateMapNodeService,
    private updateMapNodeService: UpdateMapNodeService,
    private getCoursesToAddService: GetCoursesToAddService
  ) {
    super();
  }

  // Процедура для проверки прав доступа к управлению картой.
  manageMapProcedure = checkAbilityProcedure({
    create: createCoursesMapAbility,
    check: (ability) => ability.canUpdateCoursesMap(),
  });

  // Определяем публичный роутер для контроллера.
  public router = router({
    coursesMap: router({
      // Публичная процедура для получения карты курсов.
      get: publicProcedure.query(() => {
        return this.getCoursesMapService.exec();
      }),
      // Процедура для создания узла
      createNode: this.manageMapProcedure
        .input(createCourseNodeCommandSchema)
        .mutation(({ input }) => {
          revalidatePath('/map');
          return this.createMapNodeService.exec(input);
        }),
      // Процедура для обновления узла
      updateNode: this.manageMapProcedure
        .input(updateCourseNodeCommandSchema)
        .mutation(({ input }) => {
          revalidatePath('/map');
          return this.updateMapNodeService.exec(input);
        }),
      // Процедура добавления курсов
      coursesToAdd: this.manageMapProcedure
        .input(z.object({ notFilterCourseId: z.string().optional() }))
        .query(async ({ input }) => {
          return this.getCoursesToAddService.exec(input);
        }),
      // Процедура для удаления узла с карты.
      deleteNode: this.manageMapProcedure
        .input(mapNodeIdSchema)
        .mutation(({ input }) => {
          // После удаления узла необходимо обновить путь страницы '/map'.
          revalidatePath('/map');
          return this.deleteMapNodeService.exec(input);
        }),
    }),
  });
}
