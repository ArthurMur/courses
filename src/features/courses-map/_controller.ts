import {
  router,
  Controller,
  publicProcedure,
  checkAbilityProcedure,
} from '@/kernel/lib/trpc/server';
import { injectable } from 'inversify';
import { GetCoursesMapService } from './_services/get-courses-map';
import { DeleteMapNodeService } from '@/entities/map/server';
import { createCoursesMapAbility } from './_domain/ability';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Контроллер для работы с картой курсов.
@injectable()
export class CoursesMapController extends Controller {
  constructor(
    private getCoursesMapService: GetCoursesMapService,
    private deleteMapNodeService: DeleteMapNodeService
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
      // Процедура для удаления узла с карты.
      deleteNode: this.manageMapProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => {
          // После удаления узла необходимо обновить путь страницы '/map'.
          revalidatePath('/map');
          return this.deleteMapNodeService.exec({ id: input.id });
        }),
    }),
  });
}
