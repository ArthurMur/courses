// Импорт необходимых функций и объектов из указанных модулей
import {
  createPublicServerApi, // Функция для создания публичного серверного API
  publicProcedure, // Публичная процедура
  router, // Роутер
} from '@/kernel/lib/trpc/server';
import { compileMDX } from '@/shared/lib/mdx/server'; // Импорт функции компиляции MDX
import { getCoursesListService } from '@/entities/course/course.server'; // Импорт функции получения списка курсов

// Контроллер для списка курсов
export const coursesListController = router({
  corusesList: router({
    // Объявление GET-запроса для получения списка курсов
    get: publicProcedure.query(async () => {
      // Выполнение запроса на получение списка курсов
      const coursesList = await getCoursesListService.exec();

      // Компиляция MDX для каждого курса в списке
      const compiledCourses = await Promise.all(
        coursesList.map(async (course) => ({
          ...course,
          // Компиляция описания курса в MDX
          description: await compileMDX(course.description).then((r) => r.code),
        }))
      );

      // Возврат скомпилированных курсов
      return compiledCourses;
    }),
  }),
});

// Тип контроллера для списка курсов
export type CoursesListController = typeof coursesListController;

// Создание публичного серверного API на основе контроллера списка курсов
export const coursesListServerApi = createPublicServerApi(
  coursesListController
);
