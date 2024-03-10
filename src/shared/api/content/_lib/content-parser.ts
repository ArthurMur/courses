import { ParsingError, ValidationError } from '@/shared/lib/errors';
import * as Yaml from 'yaml';
import Ajv from 'ajv';

//Класс для парсинга и валидации контента
export class ContentParser {
  private ajv = new Ajv(); // инстанция AJV для валидации

  /**
   * Парсит и проверяет контент на соответствие схеме
   * @param text текст контента в формате yaml
   * @param schema схема контента
   * @returns проверенный контент
   * @throws ValidationError в случае не валидного контента
   * @throws ParsingError в случае ошибки парсинга
   */
  async parse<T>(text: string, schema: object): Promise<T> {
    try {
      const resultObject: unknown = await Yaml.parse(text); // парсим контент

      if (this.ajv.validate(schema, resultObject)) {
        // валидируем
        return resultObject as T; // возвращаем результат в виде T
      } else {
        throw new ValidationError([...(this.ajv.errors ?? [])]); // выбрасываем ошибку валидации
      }
    } catch (error) {
      throw new ParsingError(text, 'Ошибка парсинга контента', error); // выбрасываем ошибку парсинга
    }
  }
}
