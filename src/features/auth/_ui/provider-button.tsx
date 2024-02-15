'use client';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { Github } from 'lucide-react';
import { ClientSafeProvider } from 'next-auth/react';
import { useOAuthSignIn } from '../_vm/use-oauth-sign-in';

// Компонент кнопки провайдера аутентификации
export function ProviderButton({ provider }: { provider: ClientSafeProvider }) {
  // Получение функций для входа через OAuth из кастомного хука useOAuthSignIn
  const oauthSignIn = useOAuthSignIn(provider);

  // Функция для получения иконки провайдера
  const getIcon = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case 'github':
        return <Github className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  // Возврат компонента кнопки
  return (
    <Button
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
    >
      {/* Спиннер загрузки или иконка провайдера */}
      {oauthSignIn.isPending ? (
        <Spinner className="mr-2 h-4 w-4 animate-spin" aria-label="Вход" />
      ) : (
        getIcon(provider)
      )}
      {provider.name}
    </Button>
  );
}
