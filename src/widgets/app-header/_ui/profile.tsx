'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useSignOut } from '@/features/auth/use-sign-out';
import { Skeleton } from '@/shared/ui/skeleton';
import { SignInButton } from '@/features/auth/sign-in-button';
import { ProfileAvatar, getProfileDisplayName } from '@/entities/user/profile';
import { useAppSession } from '@/entities/user/session';

export function Profile() {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === 'loading') {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (session.status === 'unauthenticated') {
    return <SignInButton />;
  }

  const user = session?.data?.user;

  return (
    // Компонент выпадающего меню для профиля пользователя
    <DropdownMenu>
      {/* Триггер для открытия меню, представленный кнопкой */}
      <DropdownMenuTrigger asChild>
        {/* Кнопка с аватаром пользователя */}
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          {/* Аватар пользователя */}
          <ProfileAvatar profile={user} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      {/* Содержимое выпадающего меню */}
      <DropdownMenuContent className="w-56 mr-2 ">
        {/* Метка с информацией о пользователе */}
        <DropdownMenuLabel>
          {/* Имя пользователя */}
          <p>Мой аккаунт</p>
          {/* Дополнительная информация о пользователе */}
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {user ? getProfileDisplayName(user) : undefined}
          </p>
        </DropdownMenuLabel>
        {/* Группа элементов меню */}
        <DropdownMenuGroup></DropdownMenuGroup>
        {/* Разделитель */}
        <DropdownMenuSeparator />
        {/* Группа элементов меню */}
        <DropdownMenuGroup>
          {/* Пункт меню для перехода на страницу профиля */}
          <DropdownMenuItem asChild>
            {/* Ссылка на страницу профиля */}
            <Link href={`/profile/1`}>
              {/* Иконка профиля */}
              <User className="mr-2 h-4 w-4" />
              {/* Текст пункта меню */}
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          {/* Пункт меню для выхода из аккаунта */}
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            {/* Иконка выхода */}
            <LogOut className="mr-2 h-4 w-4" />
            {/* Текст пункта меню */}
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
