import { Course } from '../_domain/types';
import { contentApi } from '@/shared/api/content';
import { logger } from '@/shared/lib/logger';
import { injectable } from 'inversify';
import { allSuccess } from '@/shared/lib/promise';
import { CourseId, CourseSlug } from '@/kernel/domain/course';

@injectable()
export class CoursesRepository {
  // Получение списка курсов
  coursesList = async (): Promise<Course[]> => {
    // Загрузка манифеста курсов
    const manifest = await contentApi.fetchManifest();

    // Асинхронная функция для получения курса
    const fetchCourse = async (courseSlug: string): Promise<Course> => {
      // Загрузка курса по его слагу
      const course = await contentApi.fetchCourse(courseSlug);

      // Возвращение объекта курса с дополнительными полями
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: courseSlug,
        image: course.image,
        thumbnail: course.thumbnail,
        dependencies: await allSuccess(
          // Получение всех зависимостей курса с помощью функции allSuccess
          course.dependencies?.map((slug) =>
            contentApi.fetchCourse(slug).then((r) => r.id)
          ) ?? []
        ),
        shortDescription: course.shortDescription,
        product: course.product,
      };
    };

    // Получение всех курсов и логирование ошибок, если они возникнут
    return allSuccess(manifest.courses.map(fetchCourse), (value, i) => {
      if (value.status === 'rejected') {
        logger.error({
          msg: 'Course by slug not found', // Сообщение об ошибке
          slug: manifest.courses[i], // Слаг курса, который не найден
          error: value.reason, // Причина ошибки
        });
      }
    });
  };

  // Получение курса по его идентификатору
  async courseById(courseId: CourseId) {
    const list = await this.coursesList();
    return list.find((course) => course.id === courseId);
  }

  // Получение курса по его слагу
  async courseSlug(courseSlug: CourseSlug) {
    const list = await this.coursesList();
    return list.find((course) => course.slug === courseSlug);
  }
}
