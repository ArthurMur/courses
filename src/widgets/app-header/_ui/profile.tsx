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
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

export function Profile() {
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
          <Avatar className="w-8 h-8">
            {/* Показывается в случае, если не удалось загрузить аватар */}
            <AvatarFallback>АМ</AvatarFallback>
          </Avatar>
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
            Мурадов
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
          <DropdownMenuItem>
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
