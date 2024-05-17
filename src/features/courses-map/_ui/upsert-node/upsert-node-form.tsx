'use client';
/* eslint-disable @next/next/no-img-element */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { Spinner } from '@/shared/ui/spinner';
import { CommonFields, commonFieldsSchema } from './field-groups/common-fields';
import { CourseFields } from './field-groups/course-fields';
import { CourseNode, CoursesMapNode } from '../../_domain/types';
import {
  INITIAL_HEIGHT,
  INITIAL_ROTATION,
  INITIAL_SCALE,
  INITIAL_WIDTH,
} from '../../_constant';
import { useGetScreenCenter } from '../../_vm/lib/use-get-screen-center';
import { MAP_NODE_TYPES } from '@/entities/map';

// Основная схема формы с использованием zod, объединяющая общие поля и поля курса
const formSchema = z
  .object({
    courseId: z.string().min(5), // Поле courseId должно быть строкой минимальной длины 5
  })
  .merge(commonFieldsSchema); // Объединение с общей схемой полей

type FormValues = z.infer<typeof formSchema>; // Тип данных формы на основе схемы

// Компонент формы для добавления/обновления узла
export function UpsertNodeForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void; // Функция, вызываемая при успешной отправке формы
  children?: React.ReactNode; // Дочерние элементы для рендеринга внутри формы
  node?: CoursesMapNode; // Опционально, узел для редактирования
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Валидатор формы с использованием схемы
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    onSuccess?.(); // Вызов функции onSuccess при успешной отправке формы
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Form>
  );
}

// Компонент для рендеринга полей формы
export function UpsertNodeFormFields({ node }: { node?: CoursesMapNode }) {
  const form = useFormContext<FormValues>(); // Использование контекста формы

  const getScreenCenter = useGetScreenCenter(); // Получение центра экрана

  const screenCenter = getScreenCenter({
    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT,
  });

  return (
    <div className="flex flex-col gap-4">
      <CommonFields
        defaultFields={{
          height: (node?.height ?? INITIAL_HEIGHT).toString(),
          width: (node?.width ?? INITIAL_WIDTH).toString(),
          rotation: (node?.rotation ?? INITIAL_ROTATION).toString(),
          scale: (node?.scale ?? INITIAL_SCALE).toString(),
          hidden: node?.hidden ?? true,
          x: (node?.x ?? screenCenter.x).toString(),
          y: (node?.y ?? screenCenter.y).toString(),
          zIndex: node?.zIndex?.toString() ?? '',
          type: node?.type,
        }}
        renderSpecificFields={({ type }) =>
          (node?.type ?? type) === MAP_NODE_TYPES.COURSE ? (
            <CourseFields
              defaultValues={{
                courseId: (node as CourseNode)?.courseId,
              }}
            />
          ) : null
        }
      />
    </div>
  );
}

// Компонент для отображения действий формы (кнопки)
export function UpsertNodeFormActions() {
  return (
    <Button type="submit">
      <Spinner
        className="mr-2 h-4 w-4 animate-spin"
        aria-label="Добавление курса"
      />
      Добавить
    </Button>
  );
}
