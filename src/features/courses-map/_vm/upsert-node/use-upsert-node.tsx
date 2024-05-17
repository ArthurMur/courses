import { z } from 'zod';
import { coursesMapApi } from '../../_api';
import { CoursesMapNode } from '../../_domain/types';
import { MAP_NODE_TYPES } from '@/entities/map';

// Схема для валидации данных при создании или обновлении узла карты
export const upsertNodeSchema = z
  .object({
    width: z.number(), // Ширина узла
    height: z.number(), // Высота узла
    scale: z.number(), // Масштаб узла
    rotation: z.number(), // Поворот узла
    x: z.number(), // Координата X узла
    y: z.number(), // Координата Y узла
    zIndex: z.number().optional(), // Значение Z-индекса (необязательно)
    hidden: z.boolean(), // Флаг скрытия узла
  })
  .and(
    z.discriminatedUnion('type', [
      // Дискриминирующий союз для типа узла
      z.object({
        // Объект с типом курса
        type: z.literal(MAP_NODE_TYPES.COURSE), // Тип узла - курс
        courseId: z.string(), // Идентификатор курса
      }),
      z.object({
        // Объект с типом изображения
        type: z.literal(MAP_NODE_TYPES.IMAGE), // Тип узла - изображение
        src: z.string(), // Ссылка на изображение
      }),
    ])
  );

// Хук для создания или обновления узла карты
export function useUpsertNode(node?: CoursesMapNode) {
  const utils = coursesMapApi.useUtils(); // Использование утилит API курсов на карте

  // Функция для инвалидации данных
  const invalidate = async () => {
    await utils.coursesMap.invalidate(); // Инвалидация данных карты курсов
  };

  // Мутации для создания и обновления узла
  const createMutation = coursesMapApi.coursesMap.createNode.useMutation({
    mutationKey: ['createCourseNode'], // Ключ мутации для создания узла
    async onSettled() {
      await invalidate(); // Инвалидация данных после завершения мутации
    },
  });
  const updateMutation = coursesMapApi.coursesMap.updateNode.useMutation({
    mutationKey: ['updateCourseNode'], // Ключ мутации для обновления узла
    async onSettled() {
      await invalidate(); // Инвалидация данных после завершения мутации
    },
  });

  return {
    // Состояние выполнения операции создания или обновления узла
    isPending: createMutation.isPending || updateMutation.isPending,
    // Функция для сохранения данных узла
    save: async (data: z.infer<typeof upsertNodeSchema>) => {
      if (node) {
        // Если узел существует, выполняется обновление
        await updateMutation.mutateAsync({
          id: node.id, // Идентификатор узла
          ...data, // Данные для обновления
        });
      } else {
        // Если узел не существует, выполняется создание
        await createMutation.mutateAsync(data);
      }
    },
  };
}
