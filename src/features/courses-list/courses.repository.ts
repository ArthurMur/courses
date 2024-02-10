import { dbClient } from '@/shared/lib/db';
import { cache } from 'react';

class CoursesRepository {
  // Получить список курсов из кэша или базы данных
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany()
  );

  // Создать элемент курса
  createCourseElement = (
    command: CreateCourseListElementCommand
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  // Удалить элемент курса
  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };
}

export const coursesRepository = new CoursesRepository();
