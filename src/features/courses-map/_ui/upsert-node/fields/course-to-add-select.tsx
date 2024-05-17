import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/ui/utils';
import { Spinner } from '@/shared/ui/spinner';
import { useState } from 'react';
import { CourseId } from '@/kernel/domain/course';

// Компонент для выбора курса
export function CourseToAddSelect({
  value,
  onChange,
}: {
  value?: CourseId; // Выбранный курс
  onChange: (value: CourseId) => void; // Функция для изменения выбранного курса
}) {
  const [open, setOpen] = useState(false); // Состояние для управления открытием поповера
  const courses = [] as { label: string; value: string }[]; // Массив курсов, из которых можно выбрать
  const isPending = false; // Флаг для отображения спиннера (например, при загрузке данных)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn('justify-between', !value && 'text-muted-foreground')} // Стиль кнопки
        >
          {value
            ? courses.find((course) => course.value === value)?.label // Отображение выбранного курса
            : 'Select course'}{' '}
          {isPending ? (
            <Spinner className="ml-2 h-4 w-4 shrink-0" /> // Спиннер при загрузке
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> // Иконка раскрытия
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[400px] p-0">
        <Command>
          {/* Поле для поиска */}
          <CommandInput placeholder="Search course..." />
          {/* Сообщение, если курсы не найдены */}
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses.map((course) => (
              <CommandItem
                value={course.label}
                key={course.value}
                onSelect={() => {
                  onChange(course.value); // Изменение выбранного курса
                  setOpen(false); // Закрытие попапа
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    course.value === value ? 'opacity-100' : 'opacity-0' // Иконка "Check" для выбранного курса
                  )}
                />
                {course.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
