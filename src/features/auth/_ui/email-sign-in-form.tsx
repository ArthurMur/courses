'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';
import { useEmailSignIn } from '../_vm/use-email-sign-in';

// Компонент формы входа через Email/*  */
export function EmailSignInForm() {
  // Инициализация хука useForm с указанием начальных значений
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });

  // Получение функций для входа через Email из кастомного хука useEmailSignIn
  const emailSignIn = useEmailSignIn();

  return (
    // Обертка формы
    <Form {...form}>
      {/* Форма для входа через Email */}
      <form
        onSubmit={form.handleSubmit((data) => emailSignIn.signIn(data.email))}
      >
        {/* Контейнер для элементов формы */}
        <div className="grid gap-2">
          {/* Поле ввода Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* Метка поля ввода Email */}
                <FormLabel className="sr-only">Email</FormLabel>
                {/* Контроллер для поля ввода Email */}
                <FormControl>
                  {/* Ввод Email */}
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    // Отключение поля ввода во время загрузки
                    disabled={emailSignIn.isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Кнопка входа через Email */}
          <Button disabled={emailSignIn.isPending}>
            {/* Спиннер загрузки */}
            {emailSignIn.isPending && (
              <Spinner className="mr-2 h-4 w-4" aria-label="Загрузка выхода" />
            )}
            Войти через Email
          </Button>
        </div>
      </form>
    </Form>
  );
}
