import { CourseId } from '@/kernel/domain/course';
import { MapNodeId } from '@/kernel/domain/map';

// Определение типов для позиции узла на карте
export type MapNodePosition = {
  x: number; // Координата X
  y: number; // Координата Y
  zIndex?: number; // Индекс Z (необязательный)
};

// Определение типов для размеров узла на карте
export type MapNodeDimensions = {
  width: number; // Ширина в пикселях
  height: number; // Высота в пикселях
  rotation: number; // Поворот в градусах
  scale: number; // Масштаб
};

// Определение типов для настроек узла на карте
export type MapNodeSettings = {
  hidden: boolean; // Флаг скрытости
};

// Объединение базовых типов для узла на карте
export type BaseMapNode = MapNodePosition &
  MapNodeDimensions &
  MapNodeSettings & {
    id: MapNodeId; // Идентификатор узла
  };

// Тип данных для узла, представляющего курс
export type CourseMapNodeData = {
  type: 'course'; // Тип "курс"
  courseId: CourseId; // Идентификатор курса
};

// Тип данных для узла, представляющего изображение
export type ImageMapNodeData = {
  type: 'image'; // Тип "изображение"
  src: string; // Путь к изображению
};

// Объединение базового узла с данными курса
export type CourseMapNode = BaseMapNode & CourseMapNodeData;
// Объединение базового узла с данными изображения
export type ImageMapNode = BaseMapNode & ImageMapNodeData;

// Тип для обобщенного узла на карте, который может быть курсом или изображением
export type MapNode = CourseMapNode | ImageMapNode;

// Тип для определения типа узла на карте
export type MapNodeType = MapNode['type'];

// Константы для типов узлов на карте
export const MAP_NODE_TYPES = {
  COURSE: 'course' as const, // Тип "курс"
  IMAGE: 'image' as const, // Тип "изображение"
};
