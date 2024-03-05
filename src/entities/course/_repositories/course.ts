import { cache } from 'react';
import { CourseEntity } from '../_domain/types';
class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseEntity[]> => {
    return [
      {
        id: 'test1',
        slug: 'test1',
        name: 'test1',
        description: 'description',
      },
    ];
  });
}

export const coursesRepository = new CoursesRepository();
