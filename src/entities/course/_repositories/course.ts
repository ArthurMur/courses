import { cache } from 'react';
import { CourseEntity } from '../_domain/types';
import { contentApi } from '@/shared/api/content';
import { logger } from '@/shared/lib/logger';

import { injectable } from 'inversify';
@injectable()
export class CoursesRepository {
  // Получение списка курсов
  getCoursesList = cache(async (): Promise<CourseEntity[]> => {
    // загрузка манифеста курсов
    const manifest = await contentApi.fetchManifest();

    // асинхронная функция для получения курса
    const fetchCourse = async (courseSlug: string): Promise<CourseEntity> => {
      // загрузка курса по его slug
      const course = await contentApi.fetchCourse(courseSlug);

      // получение идентификатора курса,
      // заголовка, описания и slug-имени курса из загруженного курса
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: courseSlug,
      };
    };

    // асинхронный мап по массиву курсов из манифеста
    const setteldCourses = await Promise.allSettled(
      manifest.courses.map(fetchCourse)
    );

    // проход по полученным курсам и фильтрация отклоненных
    setteldCourses.forEach((value, i) => {
      // Проверка, не отклонен ли статус курса
      if (value.status === 'rejected') {
        // Реегистрация сообщения об ошибке с указанием слага, ошибки и причины.
        logger.error({
          msg: 'Course by slug not found',
          slug: manifest.courses[i],
          error: value.reason,
        });
      }
    });

    // фильтрация успешно загруженных курсов и получение их значений из промисов
    return setteldCourses
      .filter(
        (courseResult): courseResult is PromiseFulfilledResult<CourseEntity> =>
          courseResult.status === 'fulfilled'
      )
      .map((course) => {
        return course.value;
      });
  });
}
