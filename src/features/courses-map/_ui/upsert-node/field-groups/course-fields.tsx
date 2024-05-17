import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { useFormContext } from 'react-hook-form';
import { CourseToAddSelect } from '../fields/course-to-add-select';

// Схема проверки данных для полей курса с использованием библиотеки zod
export const courseFieldsSchema = z.object({
  courseId: z.string().optional(), // Поле courseId является необязательным и должно быть строкой
});

type FormValues = z.infer<typeof courseFieldsSchema>; // Тип данных формы, сгенерированный на основе схемы

// Компонент для полей формы, относящихся к курсу
export function CourseFields({ defaultValues }: { defaultValues: FormValues }) {
  const form = useFormContext<FormValues>(); // Использование контекста формы

  return (
    <>
      {/* Поле для выбора курса */}
      <FormField
        control={form.control}
        name="courseId"
        defaultValue={defaultValues.courseId}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Курс</FormLabel>
            <FormControl>
              <CourseToAddSelect
                value={field.value} // Значение, выбранное в селекте
                onChange={field.onChange} // Обработчик изменения значения
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
