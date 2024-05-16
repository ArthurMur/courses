import { CourseId } from '@/kernel/domain/course';
import { CoursesRepository } from '../_repositories/course';
import { injectable } from 'inversify';

type GetCourseByIdQuery = {
  id: CourseId;
};

@injectable()
export class GetCourseByIdService {
  constructor(private coursesRepository: CoursesRepository) {} // Внедряем репозиторий курсов

  // Асинхронный метод для выполнения запроса курса по идентификатору
  async exec(query: GetCourseByIdQuery) {
    // Возвращаем результат запроса курса по его идентификатору
    return this.coursesRepository.courseById(query.id);
  }
}
