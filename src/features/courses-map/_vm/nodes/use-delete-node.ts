import { coursesMapApi } from '../../_api';

// Хук для удаления узла с карты курсов.
export function useDeleteNode() {
  // Получаем утилиты из API для работы с картой курсов.
  const utils = coursesMapApi.useUtils();

  // Используем хук useMutation для удаления узла.
  const { mutate } = coursesMapApi.coursesMap.deleteNode.useMutation({
    // Функция вызывается перед выполнением мутации.
    onMutate({ id }) {
      // Отменяем предыдущий запрос на получение данных карты курсов.
      utils.coursesMap.get.cancel();

      // Получаем текущий список курсов перед удалением узла.
      const coursesList = utils.coursesMap.get.getData();

      // Устанавливаем новый список курсов без удаленного узла.
      utils.coursesMap.get.setData(undefined, (data) => {
        return data?.filter((node) => node.id !== id);
      });

      // Возвращаем данные перед выполнением мутации для использования в случае отмены или ошибки.
      return { coursesList };
    },
    // Функция вызывается в случае ошибки мутации.
    onError(_, __, context) {
      // Восстанавливаем предыдущий список курсов в случае ошибки.
      utils.coursesMap.get.setData(undefined, context?.coursesList);
    },
    // Функция вызывается после завершения мутации.
    async onSettled() {
      // Обновляем данные карты курсов после завершения мутации.
      await utils.coursesMap.get.invalidate();
    },
  });

  // Возвращаем функцию для удаления узла.
  return {
    deleteNode: mutate,
  };
}
