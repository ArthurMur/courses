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
    const fetchData = async () => {
      // Получить манифест по URL-адресу
      const text = await this.d.fileFetcher.fetchText(this.getManifestUrl());
      // Разобрать содержимое манифеста
      return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
    };
    // Вернем манифест из кеша или получим его, если его в кеше нет.
    return this.d.cacheStrategy.fetch(['manifest'], fetchData);
  }

  /**
   * Запрос курса по его слагу.
   * Выполняет запрос через CacheStrategy, парсит результат через ContentParser
   * и возвращает объект типа Course
   * @param slug - слаг курса
   */
  async fetchCourse(slug: CourseSlug) {
    const fetchData = async () => {
      // Получить курс по URL-адресу
      const text = await this.d.fileFetcher.fetchText(this.getCourseUrl(slug));
      // Разобрать содержимое курса
      return await this.d.contentParser.parse<Course>(text, courseSchema);
    };
    // Вернем курс из кеша или получим его, если его в кеше нет.
    return this.d.cacheStrategy.fetch(['course', slug], fetchData);
  }

  /**
   * Запрос урока по его слагам курса и урока.
   * Выполняет запрос через CacheStrategy, парсит результат через ContentParser
   * и возвращает объект типа Lesson
   * @param courseSlug - слаг курса
   * @param lessonSlug - слаг урока
   */
  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    // Получить данные из API
    const fetchData = async () => {
      // Получить текст из API
      const text = await this.d.fileFetcher.fetchText(
        this.getLessonUrl(courseSlug, lessonSlug)
      );
      // Разобрать текст в объект урока
      return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
    };
    // Вернем урок из кеша или получим его, если его в кеше нет.
    return this.d.cacheStrategy.fetch(
      ['lesson', courseSlug, lessonSlug],
      fetchData
    );
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
