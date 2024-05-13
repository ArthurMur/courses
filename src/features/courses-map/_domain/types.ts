import { CourseBaseInfo } from '@/entities/course';
import {
  ImageMapNodeData,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
  ImageMapNode,
} from '@/entities/map';
import { CourseId, CourseSlug } from '@/kernel/domain/course';
import { MapNodeId } from '@/kernel/domain/map';

// Определение типа данных для изображения как узла карты
export type ImageNode = ImageMapNode;

// Определение пустого типа для добавления курса (пока без дополнительных полей)
export type CourseToAdd = {};

// Определение типа данных для данных о курсе, связанных с узлом карты
type CourseNodeData = {
  type: 'course'; // Тип данных: "курс"
  courseId: CourseId; // Идентификатор курса
  slug: CourseSlug; // Слаг курса (часть URL)
} & CourseBaseInfo; // Дополнительная информация о курсе

// Определение типа данных для узла карты, представляющего курс
export type CourseNode = {
  id: MapNodeId; // Идентификатор узла карты
} & CourseNodeData & // Данные о курсе
  MapNodePosition & // Позиция узла на карте
  MapNodeDimensions & // Размеры узла на карте
  MapNodeSettings; // Настройки узла на карте

// Определение типа данных для узла карты, который может быть либо курсом, либо изображением
export type CoursesMapNode = CourseNode | ImageNode;
