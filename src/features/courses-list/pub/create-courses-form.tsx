'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { createCourseAction } from '../actions';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/utils';

// Схема для валидации данных формы создания курса
const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export function CreateCourseForm({
  className,
  revalidatePagePath,
}: {
  className: string;
  revalidatePagePath: string;
}) {
  const [isCreateTransiton, startCreateTransition] = useTransition(); // Инициализация состояния для анимации перехода
  const form = useForm({
    resolver: zodResolver(createCourseFormSchema), // Использование Zod для валидации данных формы
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          // Начало анимации перехода при отправке
          startCreateTransition(async () => {
            createCourseAction(data, revalidatePagePath); // Вызов функции создания курса с данными формы и путем для повторной валидации страницы
          });
        })}
        className={cn(className, 'space-y-4')}
      >
        {/* Поле для ввода названия курса */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название </FormLabel>
              <FormControl>
                <Input placeholder="название..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Поле для ввода описания курса */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="описание..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" type="submit" disabled={isCreateTransiton}>
          Добавить
        </Button>
      </form>
    </Form>
  );
}
