'use client';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/shared/ui/card';
import { useTransition } from 'react';

export function CourseItem({
  course,
  onDelete,
}: {
  course: CourseListElement; // принимает элемент списка курсов
  onDelete: () => Promise<void>; // функция для удаления элемента списка курсов
}) {
  // создание состояния загрузки для удаления курса
  const [isLoadingDelete, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    // начало анимации загрузки, позволяет запустить анимацию или другие эффекты перед выполнением операции удаления
    startDeleteTransition(async () => {
      await onDelete(); // вызов функции удаления курса
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button disabled={isLoadingDelete} onClick={handleDelete}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
