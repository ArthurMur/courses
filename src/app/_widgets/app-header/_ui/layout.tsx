import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from '@/shared/ui/sheet';
import { Menu } from 'lucide-react';

export function Layout({
  logo,
  nav,
  profile,
  actions,
}: {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  profile?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    // Шапка страницы с использованием sticky позиционирования, занимающая всю ширину, с верхней границей, размытием фона и высоким индексом слоя
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Контейнер с отступами и выравниванием элементов по центру */}
      <div className="container flex h-14 items-center">
        {/* Блок с кнопкой для открытия бокового меню на мобильных устройствах */}
        <div className="md:hidden mr-2">
          {/* Компонент Sheet для создания бокового меню */}
          <Sheet>
            {/* Триггер для открытия Sheet, представленный кнопкой */}
            <SheetTrigger asChild>
              {/* Кнопка с иконкой меню */}
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            {/* Содержимое бокового меню */}
            <SheetContent side="left">
              {/* Заголовок бокового меню */}
              <SheetHeader className=" border-b pb-5 mb-5">{logo}</SheetHeader>
              {/* Навигационное меню */}
              {nav}
            </SheetContent>
          </Sheet>
        </div>

        {/* Блок с логотипом на десктопе */}
        <div className="mr-4 hidden md:flex mr-4">{logo}</div>
        {/* Блок с навигацией и профилем пользователя */}
        <div className="items-center flex-1 flex">
          {/* Навигационное меню на десктопе */}
          <div className="hidden md:flex">{nav}</div>
          {/* Блок с действиями и профилем пользователя */}
          <div className="flex flex-1 items-center justify-end space-x-3 ">
            {/* Дополнительные действия */}
            {actions}
            {/* Профиль пользователя */}
            {profile}
          </div>
        </div>
      </div>
    </header>
  );
}
