import { SafeLocalStorage } from '@/shared/lib/local-storage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useReactFlow, Viewport } from 'reactflow';
import { z } from 'zod';

// Определение схемы для валидации вида области просмотра
const viewportSchema = z.union([
  z.object({
    // Объект с параметрами x, y и zoom
    x: z.coerce.number(), // Параметр x (горизонтальная позиция)
    y: z.coerce.number(), // Параметр y (вертикальная позиция)
    zoom: z.coerce.number(), // Параметр zoom (масштаб)
  }),
  z.undefined(), // Возможность значения undefined
]);

// Создание экземпляра SafeLocalStorage для хранения данных о виде области просмотра
const viewportStorage = new SafeLocalStorage(
  'viewport', // Ключ для хранения данных
  viewportSchema, // Схема валидации
  undefined // Значение по умолчанию
);

// Создание пользовательского хука для управления начальным видом области просмотра
export function useInitialViewportEffect() {
  const flow = useReactFlow(); // Получение экземпляра реактивного потока

  useEffect(() => {
    // Обработка изменений в начальном виде области просмотра
    let viewport = viewportSchema
      .catch(() => undefined) // Обработка ошибок валидации
      .parse(
        // Преобразование параметров URL в объект виде области просмотра
        Object.fromEntries(
          new URLSearchParams(window.location.search).entries()
        )
      );

    viewport ??= viewportStorage.get(); // Использование сохраненного значения, если нет параметров в URL

    if (viewport) {
      // Если указан вид области просмотра
      flow.setViewport(viewport); // Установка виде области просмотра в поток
    } else {
      // Если вид области просмотра не указан
      flow.fitView(); // Установка масштаба так, чтобы все элементы были видны
    }
  }, [flow]); // Зависимость от объекта потока

  // Функция для установки виде области просмотра и обновления URL
  const setViewport = (viewport: Viewport) => {
    viewportStorage.set(viewport); // Сохранение виде области просмотра

    const url = new URL(window.location.href); // Получение текущего URL

    if (viewport) {
      // Если указан вид области просмотра
      url.search = new URLSearchParams(
        Object.entries(viewport).map(([key, value]) => [key, value.toString()])
      ).toString(); // Установка параметров URL из объекта виде области просмотра
    }

    window.history.replaceState(null, '', url); // Замена текущего состояния и URL в истории браузера
  };

  return {
    setViewport, // Возвращение функции для управления видом области просмотра
  };
}
