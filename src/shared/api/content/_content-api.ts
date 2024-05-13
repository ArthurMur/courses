import { join } from 'path';
import { CacheStrategy } from './_lib/cache-strategy';
import { ContentParser } from './_lib/content-parser';
import { FileFetcher } from './_lib/file-fetcher';
import manifestSchema from './_schemas/manifest.schema.json';
import courseSchema from './_schemas/course.schema.json';
import lessonSchema from './_schemas/lesson.schema.json';
import { Course } from './_schemas/course.schema';
import { Lesson } from './_schemas/lesson.schema';
import { Manifest } from './_schemas/manifest.schema';
import { loggedMethod } from '@/shared/lib/logger';
import { pick } from 'lodash-es';
import { compileMDX } from '@/shared/lib/mdx/server';

interface Deps {
  cacheStrategy: CacheStrategy;
  contentParser: ContentParser;
  fileFetcher: FileFetcher;
}

type CourseSlug = string;
type LessonSlug = string;

export class ContentApi {
  /**
   * Конструктор класса ContentApi. Принимает базовый url
   * и объект с зависимостями - объектами CacheStrategy, ContentParser и FileFetcher
   * @param baseUrl - базовый url
   * @param d - объект с зависимостями
   */
  constructor(
    private baseUrl: string,
    private d: Deps
  ) {}

  /**
   * Запрос манифеста курсов.
   * Выполняет запрос через CacheStrategy, парсит результат через ContentParser
   * и возвращает объект типа Manifest
   */

  async fetchManifest() {
    // Получаем манифест из кэша, если его там нет, то выполняем запрос на его получение
    return this.d.cacheStrategy.fetch(['manifest'], () =>
      this.fetchManifestQuey()
    );
  }

  // @loggedMethod({ logRes: (res: Manifest) => res })
  private async fetchManifestQuey() {
    // Получаем текст манифеста по URL и парсим его в объект Manifest
    const text = await this.d.fileFetcher.fetchText(this.getManifestUrl());
    return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
  }

  /**
   * Запрос курса по его слагу.
   * Выполняет запрос через CacheStrategy, парсит результат через ContentParser
   * и возвращает объект типа Course
   * @param slug - слаг курса
   */
  async fetchCourse(slug: CourseSlug) {
    // Получаем курс из кэша, если его там нет, то выполняем запрос на его получение
    return this.d.cacheStrategy.fetch(['course', slug], () =>
      this.fetchCourseQuery(slug)
    );
  }

  // @loggedMethod({
  //   // Логируем входные аргументы - slug
  //   logArgs: (slug: CourseSlug) => ({ slug }), // Логируем результат запроса, оставляя только id, title и slug
  //   logRes: (res: Course, slug) =>
  //     pick({ ...res, slug }, ['id', 'title', 'slug']),
  // })
  private async fetchCourseQuery(slug: string) {
    // Получаем текст курса по URL и парсим его в объект Course
    const text = await this.d.fileFetcher.fetchText(this.getCourseUrl(slug));
    // Парсим текст курса в объект Course с помощью схемы courseSchema
    const course = await this.d.contentParser.parse<Course>(text, courseSchema);

    return {
      ...course, // Возвращаем остальные поля объекта Course
      description: (await compileMDX(course.description)).code, // Компилируем MDX-код описания курса в HTML-код
      shortDescription: course.shortDescription // Если есть краткое описание курса
        ? (await compileMDX(course.shortDescription)).code // Компилируем его MDX-код в HTML-код
        : undefined, // В противном случае оставляем его неопределенным
    };
  }

  /**
   * Запрос урока по его слагам курса и урока.
   * Выполняет запрос через CacheStrategy, парсит результат через ContentParser
   * и возвращает объект типа Lesson
   * @param courseSlug - слаг курса
   * @param lessonSlug - слаг урока
   */
  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    // Получаем урок из кэша, если его там нет, то выполняем запрос на его получение
    return this.d.cacheStrategy.fetch(['lesson', courseSlug, lessonSlug], () =>
      this.fetchLessonQuery(courseSlug, lessonSlug)
    );
  }

  // @loggedMethod({
  //   // Логируем входные аргументы - courseSlug и lessonSlug
  //   logArgs: (courseSlug: CourseSlug, lessonSlug: LessonSlug) => ({
  //     courseSlug,
  //     lessonSlug,
  //   }), // Логируем результат запроса, оставляя только id, title и slug
  //   logRes: (res: Lesson) => pick(res, ['id', 'title', 'slug']),
  // })
  private async fetchLessonQuery(
    courseSlug: CourseSlug,
    lessonSlug: LessonSlug
  ) {
    // Получаем текст урока по URL и парсим его в объект Lesson
    const text = await this.d.fileFetcher.fetchText(
      this.getLessonUrl(courseSlug, lessonSlug)
    );
    return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
  }

  /**
   * Формирует url для запроса манифеста
   */
  private getManifestUrl() {
    return join(this.baseUrl, 'manifest.yaml');
  }

  /**
   * Формирует url для запроса курса по его слагу
   * @param slug - слаг курса
   */
  private getCourseUrl(slug: CourseSlug) {
    // Присоединяем baseUrl к ярлыку курса, чтобы получить URL-адрес курса.
    return join(this.baseUrl, `/courses/${slug}/course.yaml`);
  }

  /**
   * Формирует url для запроса урока по слагам курса и урока
   * @param courseSlug - слаг курса
   * @param lessonSlug - слаг урока
   */
  private getLessonUrl(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    // Присоединяем baseUrl к CourseSlug и LessonSlug, чтобы получить URL-адрес урока.
    return join(
      this.baseUrl,
      `/courses/${courseSlug}/lesson/${lessonSlug}/lesson.yaml`
    );
  }
}
