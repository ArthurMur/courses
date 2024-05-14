import { z } from 'zod';

// класс, обеспечивающий безопасное сохранение и извлечение значений из локального хранилища
export class SafeLocalStorage<T> {
  constructor(
    private key: string, // Ключ для сохранения значения в локальном хранилище
    private schema: z.Schema<T>, // Схема валидации значения
    private defaultValue: T // Значение по умолчанию
  ) {}

  // Метод для извлечения значения из локального хранилища
  get(): T {
    try {
      const value = localStorage.getItem(this.key); // Получение значения из локального хранилища по ключу

      if (!value) {
        // Если значение не найдено
        return this.defaultValue; // Возвращается значение по умолчанию
      }

      const parsed = this.schema.safeParse(JSON.parse(value)); // Попытка разбора и валидации полученного значения

      if (!parsed.success) {
        // Если валидация не прошла успешно
        return this.defaultValue; // Возвращается значение по умолчанию
      }

      return parsed.data; // Возвращается разобранное и валидное значение
    } catch (e) {
      // Обработка ошибок
      return this.defaultValue; // Возвращается значение по умолчанию
    }
  }

  // Метод для сохранения значения в локальное хранилище
  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(this.schema.parse(value))); // Сохранение значения в локальное хранилище после валидации
  }

  // Метод для удаления значения из локального хранилища
  clear() {
    localStorage.removeItem(this.key); // Удаление значения из локального хранилища по ключу
  }
}
