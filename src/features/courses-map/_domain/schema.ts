import {
  imageMapNodeDataSchema,
  mapNodePositionSchema,
  mapNodeDimensionsSchema,
  mapNodeSettingsSchema,
  courseMapNodeDataSchema,
} from '@/entities/map'; // Импортируем схемы данных для узлов карты
import {
  CreateMapNodeCommand,
  UpdateMapNodeCommand,
} from '@/entities/map/server'; // Импортируем команды для создания и обновления узла карты
import { SchemaOf } from '@/shared/lib/zod'; // Импортируем тип для схемы данных из библиотеки Zod
import { z } from 'zod'; // Импортируем Zod для создания схем данных

// Схема данных для идентификатора узла карты
export const mapNodeIdSchema = z.object({ id: z.string() });

// Схема данных для команды создания узла карты курса
export const createCourseNodeCommandSchema = mapNodePositionSchema
  .and(mapNodeDimensionsSchema)
  .and(mapNodeSettingsSchema)
  .and(
    courseMapNodeDataSchema.or(imageMapNodeDataSchema)
  ) as SchemaOf<CreateMapNodeCommand>; // Удостоверяемся, что схема соответствует типу данных CreateMapNodeCommand

// Схема данных для команды обновления узла карты курса
export const updateCourseNodeCommandSchema = mapNodeIdSchema
  .and(mapNodePositionSchema.partial())
  .and(mapNodeDimensionsSchema.partial())
  .and(mapNodeSettingsSchema.partial())
  .and(
    courseMapNodeDataSchema.partial().or(imageMapNodeDataSchema.partial())
  ) as SchemaOf<UpdateMapNodeCommand>; // Удостоверяемся, что схема соответствует типу данных UpdateMapNodeCommand
