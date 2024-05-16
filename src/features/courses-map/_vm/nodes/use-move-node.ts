import { MapNodeId } from '@/kernel/domain/map';
import { coursesMapApi } from '../../_api';

// Создаем и экспортируем кастомный React hook для перемещения узла на карте курсов
export function useMoveNode() {
  const utils = coursesMapApi.useUtils(); // Получаем утилиты из API для работы с картой курсов

  // Деструктурируем метод mutate из API для обновления узла на карте курсов
  const { mutate } = coursesMapApi.coursesMap.updateNode.useMutation({
    // Функция, вызываемая перед мутацией
    onMutate({ id, x, y }) {
      utils.coursesMap.get.cancel(); // Отменяем предыдущий запрос на получение данных карты курсов
      const coursesList = utils.coursesMap.get.getData(); // Получаем текущий список узлов карты курсов

      const patch = { x, y }; // Формируем данные для обновления позиции узла

      // Обновляем данные карты курсов в локальном состоянии
      utils.coursesMap.get.setData(undefined, (data) => {
        return data?.map((node) =>
          node.id === id ? Object.assign({}, node, patch) : node
        );
      });

      // Возвращаем данные для роллбэка в случае неудачи мутации
      return { coursesList };
    },
    // Функция, вызываемая при ошибке мутации
    onError(_, __, context) {
      // Восстанавливаем предыдущие данные карты курсов
      utils.coursesMap.get.setData(undefined, context?.coursesList);
    },
    // Функция, вызываемая после завершения мутации
    async onSettled() {
      // Инвалидируем кэш данных карты курсов
      await utils.coursesMap.get.invalidate();
    },
  });

  // Функция для перемещения узла на карте курсов
  const moveNode = (position: { id: MapNodeId; x: number; y: number }) => {
    // Вызываем метод mutate для выполнения мутации
    mutate(position);
  };

  // Возвращаем метод для перемещения узла на карте курсов
  return {
    moveNode,
  };
}
