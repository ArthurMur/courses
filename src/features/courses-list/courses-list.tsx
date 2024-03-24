import { CoursesListClient } from './_ui/courses-list';
import { coursesListServerApi } from './controller';

export async function CoursesList() {
  // Получаем список курсов
  const coursesList = await coursesListServerApi.corusesList.get.fetch();

  return <CoursesListClient defaultList={coursesList} />;
}
