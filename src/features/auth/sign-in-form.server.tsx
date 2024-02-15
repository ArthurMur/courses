'use server';

import { getProviders } from 'next-auth/react';
import { cn } from '@/shared/ui/utils';
import { EmailSignInForm } from './_ui/email-sign-in-form';
import { Divider } from './_ui/divider';
import { ProviderButton } from './_ui/provider-button';

// Асинхронная функция для создания формы входа
export async function SignInForm({ className }: { className?: string }) {
  // Получение доступных провайдеров аутентификации
  const providers = await getProviders();
  // Фильтрация провайдеров OAuth
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === 'oauth'
  );

  // Возвращение компонента формы входа
  return (
    <div className={cn('grid gap-6', className)}>
      {/* Компонент формы входа через Email */}
      <EmailSignInForm />
      {/* Разделитель между формой входа через Email и кнопками провайдеров */}
      <Divider />
      {/* Отображение кнопок для входа через OAuth провайдеров */}
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
