import { QueryClient } from '@tanstack/react-query';

/**
 * Интерфейс, который определяет стратегию кеширования,
 * применяемую в ContentApi.
 */
export interface CacheStrategy {
  /**
   * Метод, который выполняет запрос к кешу.
   * @param key Ключ, по которому запрос будет выполняться
   * @param getData Функция, которая выполняет запрос и возвращает его результат
   */
  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T>;
}

/**
 * Стратегия кеширования, которая просто выполняет запрос,
 * не используя кеш.
 */
export class DummyCacheStrategy implements CacheStrategy {
  /**
   * Метод, который выполняет запрос и не использует кеш.
   * @param key Не используется
   * @param getData Функция, которая выполняет запрос и возвращает его результат
   */
  fetch<T>(_: unknown[], getData: () => Promise<T>): Promise<T> {
    return getData();
  }
}

/**
 * Стратегия кеширования, которая использует react-query
 * для кеширования запросов.
 */
export class ReactQueryCacheStrategy implements CacheStrategy {
  /**
   * Таймер, который выполняет рефреш всех запросов в определенные интервалы времени.
   */
  private timer: any;

  /**
   * Конструктор, который создает новый экземпляр стратегии кеширования,
   * используя react-query.
   * @param queryClient ReactQueryQueryClient, который будет использоваться
   * для кеширования запросов.
   */
  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          /**
           * Время, в течение которого запросы будут считаться неактуальными
           * и будут выполняться повторно. В нашем случае это - бесконечность,
           * т.к. наши запросы не должны кешироваться.
           */
          staleTime: Infinity,
        },
      },
    })
  ) {
    /**
     * Запуск таймера, который будет выполнять рефреш всех запросов
     * каждый час.
     */
    this.timer = setInterval(
      () => {
        queryClient.refetchQueries();
      },
      60 * 60 * 1000
    );
  }

  /**
   * Метод, который выполняет запрос и возвращает его результат.
   * @param key Ключ, по которому запрос будет выполняться
   * @param getData Функция, которая выполняет запрос и возвращает его результат
   */
  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
    /**
     * Выполнение запроса с помощью react-query.
     * @see {@link https://react-query.tanstack.com/reference/useQuery#_top}
     */
    return this.queryClient.fetchQuery({
      queryKey: key,
      queryFn: getData,
    });
  }

  /**
   * Метод, который останавливает выполнение таймера,
   * который рефрешивает запросы.
   */
  stopRefetching() {
    clearInterval(this.timer);
  }
}
