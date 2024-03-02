'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';
import { AvatarField } from './avatar-field';
import { Profile } from '@/entities/user/profile';

const profileFormSchema = z.object({
  // Проверьте длину имени пользователя
  name: z
    .string()
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    })
    // Удалить пробелы из имени пользователя
    .transform((name) => name.trim())
    .optional(),
  // Подтвердить формат электронной почты
  email: z.string().email().optional(),
  // Проверьте формат изображения
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({
  profile,
  onSuccess,
  submitText = 'Сохранить',
}: {
  profile: Profile;
  onSuccess?: () => void; // Обратный вызов при успешной отправке формы
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    // Резолвер для значений формы
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: profile.email,
      image: profile.image ?? undefined,
      name: profile.name ?? '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватарка</FormLabel>
              <FormControl>
                <AvatarField value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {false && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Обновление профиля"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
