import {
  Context,
  createContext,
  useContext,
  startTransition,
  useEffect,
  useState,
  ReactNode,
  Children,
  isValidElement,
  createElement,
  useMemo,
  useRef,
} from 'react';

// Кастомный хук для использования строгого контекста
export function useStrictContext<T>(context: Context<T | null>) {
  // Получение значения контекста
  const value = useContext(context);
  // Проверка, что значение контекста не равно null
  if (value === null) throw new Error('Strict context not passed');
  // Возврат значения контекста
  return value as T;
}

// Функция для создания строгого контекста
export function createStrictContext<T>() {
  // Создание и возврат контекста с начальным значением null
  return createContext<T | null>(null);
}

// Кастомный хук для управления задержкой появления элемента
export function useAppearanceDelay(
  show?: boolean,
  options = {} as {
    defaultValue?: boolean;
    appearenceDelay?: number;
    minDisplay?: number;
  }
) {
  // Деструктуризация параметров с установкой значений по умолчанию
  const {
    minDisplay = 500,
    defaultValue = false,
    appearenceDelay = 500,
  } = options;

  // Состояние для отложенного появления элемента
  const [delayedShow, setDelayedShow] = useState(defaultValue);

  // Эффект для управления задержкой
  useEffect(() => {
    if (show) {
      // Установка таймера для задержки появления элемента
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearenceDelay);
      // Очистка таймера при размонтировании компонента или изменении зависимостей
      return () => clearTimeout(timer);
    } else {
      // Установка таймера для минимального отображения элемента
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);
      // Очистка таймера при размонтировании компонента или изменении зависимостей
      return () => clearTimeout(timer);
    }
  }, [appearenceDelay, show, minDisplay]);

  // Возврат состояния отложенного появления элемента
  return delayedShow;
}

// Компонент для композиции дочерних элементов
export function ComposeChildren({ children }: { children: ReactNode }) {
  // Преобразование дочерних элементов в массив
  const array = Children.toArray(children);
  // Извлечение последнего элемента из массива
  const last = array.pop();
  // Возврат компонента с применением последнего элемента ко всем предыдущим
  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last
      )}
    </>
  );
}

// Тип для функции
type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

// Кастомный хук для обработки событий с обновлением колбэка
export function useEventCallback<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  // Создание ссылки на колбэк
  const ref = useRef<Fn<A, R>>(fn);
  // Эффект для обновления колбэка
  useEffect(() => {
    ref.current = fn;
  });
  // Возврат мемоизированной функции
  return useMemo(
    () =>
      (...args: A): R => {
        const { current } = ref;
        return current(...args);
      },
    []
  );
}
