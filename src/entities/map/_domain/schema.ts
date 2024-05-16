import { SchemaOf } from '@/shared/lib/zod';
import { z } from 'zod';
import {
  CourseMapNodeData,
  ImageMapNodeData,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
} from './types';

// Схема данных для позиции узла карты
export const mapNodePositionSchema = z.object({
  x: z.number(), // Координата x
  y: z.number(), // Координата y
  zIndex: z.number().optional(), // Опциональный z-index
}) satisfies SchemaOf<MapNodePosition>; // Удостоверяемся, что схема соответствует типу данных MapNodePosition

// Схема данных для размеров узла карты
export const mapNodeDimensionsSchema = z.object({
  width: z.number(), // Ширина (в пикселях)
  height: z.number(), // Высота (в пикселях)
  rotation: z.number(), // Угол поворота (в градусах)
  scale: z.number(), // Масштаб
}) satisfies SchemaOf<MapNodeDimensions>; // Удостоверяемся, что схема соответствует типу данных MapNodeDimensions

// Схема данных для настроек узла карты
export const mapNodeSettingsSchema = z.object({
  hidden: z.boolean(), // Скрыт ли узел
}) satisfies SchemaOf<MapNodeSettings>; // Удостоверяемся, что схема соответствует типу данных MapNodeSettings

// Схема данных для узла карты курса
export const courseMapNodeDataSchema = z.object({
  type: z.literal('course'), // Тип - курс
  courseId: z.string(), // Идентификатор курса
}) satisfies SchemaOf<CourseMapNodeData>; // Удостоверяемся, что схема соответствует типу данных CourseMapNodeData

// Схема данных для узла карты с изображением
export const imageMapNodeDataSchema = z.object({
  type: z.literal('image'), // Тип - изображение
  src: z.string(), // Путь к изображению
}) satisfies SchemaOf<ImageMapNodeData>; // Удостоверяемся, что схема соответствует типу данных ImageMapNodeData
