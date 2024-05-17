import { CourseId } from '@/kernel/domain/course';
import { coursesMapApi } from '../../_api';

// Хук для получения опций курсов для добавления
export function useCoursesToAddOptions(courseId?: CourseId) {
  // Выполнение запроса к API для получения курсов, которые можно добавить
  const { isPending, data } = coursesMapApi.coursesMap.coursesToAdd.useQuery(
    { notFilterCourseId: courseId }, // Параметр запроса для исключения определенного курса
    {
      // Преобразование данных, полученных от API
      select: (courses) =>
        courses?.map((course) => ({ label: course.title, value: course.id })),
    }
  );

  // Возврат состояния запроса и преобразованных данных
  return {
    isPending, // Состояние запроса (выполняется или нет)
    options: data, // Преобразованные данные
  };
}
