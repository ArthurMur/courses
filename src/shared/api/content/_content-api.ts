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

<<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
+/**
+ * Класс ContentApi предназначен для работы с данными курса, которые хранятся в 
+ * формате YAML в Github-репозитории. 
+ * 
+ * Конструктор принимает URL-адрес репозитория и объект с зависимостями:
+ * cacheStrategy - стратегия кеширования (в зависимости от среды),
+ * contentParser - парсер YAML-файлов,
+ * fileFetcher - загрузчик файлов из репозитория.
+ */
interface Deps {
  cacheStrategy: CacheStrategy;
  contentParser: ContentParser;
  fileFetcher: FileFetcher;
-}
-
-type CourseSlug = string;
-type LessonSlug = string;
-
-export class ContentApi {
-  constructor(
-    private baseUrl: string,
-    private d: Deps
-  ) {}
-
-  async fetchManifest() {
-    const fetchData = async () => {
-      const text = await this.d.fileFetcher.fetchText(this.getManifestUrl());
-      return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
-    };
-    return this.d.cacheStrategy.fetch(['manifest'], fetchData);
-  }
-
-  async fetchCourse(slug: CourseSlug) {
-    const fetchData = async () => {
-      const text = await this.d.fileFetcher.fetchText(this.getCourseUrl(slug));
-      return await this.d.contentParser.parse<Course>(text, courseSchema);
-    };
-    return this.d.cacheStrategy.fetch(['course', slug], fetchData);
-  }
-
-  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
-    const fetchData = async () => {
-      const text = await this.d.fileFetcher.fetchText(
-        this.getLessonUrl(courseSlug, lessonSlug)
-      );
-      return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
-    };
-    return this.d.cacheStrategy.fetch(
-      ['lesson', courseSlug, lessonSlug],
-      fetchData
-    );
-  }
-
-  private getManifestUrl() {
-    return join(this.baseUrl, 'manifest.yaml');
-  }
-  private getCourseUrl(slug: CourseSlug) {
-    return join(this.baseUrl, `/courses/${slug}/course.yaml`);
-  }
-  private getLessonUrl(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
-    return join(
-      this.baseUrl,
-      `/courses/${courseSlug}/lesson/${lessonSlug}/lesson.yaml`
-    );
-  }
}
+
+/**
+ * Slug - краткое имя курса или урока.
+ */
+type CourseSlug = string;
+type LessonSlug = string;
+
+export class ContentApi {
+  /**
+   * URL-адрес репозитория, из которого будут загружаться данные курса.
+   */
+  private baseUrl: string;
+
+  /**
+   * Зависимости, которые передаются в конструкторе.
+   */
+  private d: Deps;
+
+  constructor(baseUrl: string, d: Deps) {
+    this.baseUrl = baseUrl;
+    this.d = d;
+  }
+
+  /**
+   * Загружает манифест курса из репозитория. 
+   * Возвращает данные в виде объекта типа Manifest (схема в _schemas/manifest.schema.json).
+   */
+  async fetchManifest() {
+    const fetchData = async () => {
+      const text = await this.d.fileFetcher.fetchText(this.getManifestUrl());
+      return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
+    };
+    return this.d.cacheStrategy.fetch(['manifest'], fetchData);
+  }
+
+  /**
+   * Загружает данные курса по его slug-имени.
+   * Возвращает данные в виде объекта типа Course (схема в _schemas/course.schema.json).
+   */
+  async fetchCourse(slug: CourseSlug) {
+    const fetchData = async () => {
+      const text = await this.d.fileFetcher.fetchText(this.getCourseUrl(slug));
+      return await this.d.contentParser.parse<Course>(text, courseSchema);
+    };
+    return this.d.cacheStrategy.fetch(['course', slug], fetchData);
+  }
+
+  /**
+   * Загружает данные урока по его slug-имени.
+   * Возвращает данные в виде объекта типа Lesson (схема в _schemas/lesson.schema.json).
+   */
+  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
+    const fetchData = async () => {
+      const text = await this.d.fileFetcher.fetchText(
+        this.getLessonUrl(courseSlug, lessonSlug)
+      );
+      return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
+    };
+    return this.d.cacheStrategy.fetch(
+      ['lesson', courseSlug, lessonSlug],
+      fetchData
+    );
+  }
+
+  /**
+   * Формирует URL-адрес манифеста курса в репозитории.
+   */
+  private getManifestUrl() {
+    return join(this.baseUrl, 'manifest.yaml');
+  }
+
+  /**
+   * Формирует URL-адрес YAML-файла курса в репозитории.
+   */
+  private getCourseUrl(slug: CourseSlug) {
+    return join(this.baseUrl, `/courses/${slug}/course.yaml`);
+  }
+
+  /**
+   * Формирует URL-адрес YAML-файла урока в ре
<<<<<<<  f3565dab-903b-48c1-bb8f-781df0ecd551  >>>>>>>
