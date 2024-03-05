import { privateConfig } from '@/shared/config/private';
import { FileFetcher } from './_lib/file-fetcher';
import { ContentParser } from './_lib/content-parser';
import {
  DummyCacheStrategy,
  ReactQueryCacheStrategy,
} from './_lib/cache-strategy';
import { ContentApi } from './_content-api';

/**
 * Загрузчик файлов из Git-репозитория.
 * Передаем токен, который необходим для аутентификации
 * в запросах к Github API.
 */
const fileFetcher = new FileFetcher(privateConfig.CONTENT_TOKEN);

// Создаём парсер YAML-файлов.
const contentParser = new ContentParser();

// Создаём стратегию кеширования на основе библиотеки react-query
const reactQueryCacheStrategy = new ReactQueryCacheStrategy();

/**
 * Создаём стратегию кеширования, которая ничего не кеширует,
 * но при этом не делает запросов к Github API.
 */
const dummyCacheStrategy = new DummyCacheStrategy();

/**
 * Создаём API для работы с данными курса.
 * Устанавливаем зависимости: загрузчик файлов,
 * парсер, стратегию кеширования.
 * Также определяем, какую стратегию кеширования будет использоваться
 * в зависимости от текущей среды (dev или prod).
 */
export const contentApi = new ContentApi(privateConfig.CONTENT_URL, {
  cacheStrategy:
    process.env.NODE_ENV === 'development'
      ? dummyCacheStrategy // В разработке используем стратегию, которая ничего не кеширует
      : reactQueryCacheStrategy, // В prod используем стратегию на основе react-query
  contentParser, // Параллельная загрузка нескольких файлов
  fileFetcher, // Загрузка файлов из репозитория
});
