import { create } from 'zustand';
import { CoursesMapNode } from '../../_domain/types';

// интерфейс состояния для модального окна добавления или обновления узла
interface UpsertNodeModalState {
  isOpen: boolean;
  node?: CoursesMapNode;

  // Метод для открытия модального окна с передачей данных узла
  open: (node?: CoursesMapNode) => void;
  // Метод для закрытия модального окна
  close: () => void;
}

// кастомный хук для управления состоянием модального окна
export const useUpsertNodeModal = create<UpsertNodeModalState>()((set) => ({
  // Начальное состояние модального окна
  isOpen: false,
  node: undefined,

  // Метод для открытия модального окна с передачей данных узла
  open: (node?: CoursesMapNode) => set({ isOpen: true, node }),
  // Метод для закрытия модального окна
  close: () => set({ isOpen: false, node: undefined }),
}));
