'use server';

import { revalidatePath } from 'next/cache';
import { coursesRepository } from './courses.repository';

//создание нового элемента
export const createCourseAction = async (
  command: CreateCourseListElementCommand, // команда для создания элемента
  revalidatePagePath: string // путь для перепроверки страницы
) => {
  await coursesRepository.createCourseElement(command); // вызов функции для создания элемента
  revalidatePath(revalidatePagePath); // перепроверка пути страницы
};
