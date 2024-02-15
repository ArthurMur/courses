import { SignInForm } from '@/features/auth/sign-in-form.server';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Link from 'next/link';

// Компонент страницы аутентификации
export default function AuthenticationPage() {
  return (
    <>
      {/* Контейнер для центрирования */}
      <div className="container relative flex-col items-center justify-center self-center pt-24">
        {/* Карточка для формы входа */}
        <Card className="max-w-[350px] mx-auto">
          {/* Заголовок карточки */}
          <CardHeader className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Войти в аккаунт
            </h1>
          </CardHeader>
          {/* Содержимое карточки */}
          <CardContent className="grid gap-4">
            {/* Форма входа */}
            <SignInForm />
            {/* Ссылки на пользовательское соглашение и политику конфиденциальности */}
            <p className="px-0 text-center text-sm text-muted-foreground">
              Нажимая продолжить вы соглашаетесь с{' '}
              {/* Ссылка на пользовательское соглашение */}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Пользовательским соглашением
              </Link>{' '}
              и {/* Ссылка на политику конфиденциальности */}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
