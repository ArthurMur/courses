import { MAP_NODE_TYPES, MapNodeType } from './types';

// Константа для z-index узлов карты курса по умолчанию
export const COURSE_DEFAULT_Z_INDEX = 100;
// Константа для z-index узлов карты с изображением по умолчанию
export const IMAGE_DEFAULT_Z_INDEX = 1;

// Функция для получения z-index узла карты на основе его типа
export const getZIndex = (type: MapNodeType, zIndex?: number) =>
  // Если zIndex не определен, используем значение по умолчанию в зависимости от типа узла
  zIndex ?? type === MAP_NODE_TYPES.COURSE
    ? COURSE_DEFAULT_Z_INDEX // Для узлов карты курса
    : IMAGE_DEFAULT_Z_INDEX; // Для узлов карты с изображением
