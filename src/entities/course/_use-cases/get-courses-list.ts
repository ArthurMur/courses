import { CourseEntity } from '../_domain/types';
import { createId } from '@/shared/lib/id';
import { privateConfig } from '@/shared/config/private';
import { coursesRepository } from '../_repositories/course';

type GetCoursesList = {};

export class GetCoursesListUseCase {
  async exec(data?: GetCoursesList) {
    return coursesRepository.getCoursesList();
  }
}

export const getCoursesListUseCase = new GetCoursesListUseCase();
