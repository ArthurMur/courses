import { useNodesState } from 'reactflow';
import { coursesMapApi } from '../../_api';
import { CoursesMapNode } from '../../_domain/types';
import { FlowNode, createFlowNode } from './flow-node';
import { useCoursesMapAbility } from '../lib/use-courses-map-ability';
import { useEffect } from 'react';

// Объявление пользовательского хука useNodes с параметром defaultCoursesMap
export function useNodes(defaultCoursesMap: CoursesMapNode[]) {
  const ability = useCoursesMapAbility();
  // Получение данных о карте курсов с помощью API
  const { data: coursesMap } = coursesMapApi.coursesMap.get.useQuery(
    undefined, // Передача параметров запроса (в данном случае не используется)
    {
      initialData: defaultCoursesMap, // Исходные данные для карты курсов
      enabled: !!ability?.canUpdateCoursesMap(), // Включено ли обновление карты курсов в зависимости от возможности пользователя
    }
  );

  // Инициализация состояния узлов с помощью хука useNodesState
  const [nodes, setNodes, onNodesChange] = useNodesState<CoursesMapNode>(
    coursesMap.map((data) => createFlowNode(data)) // Преобразование данных карты курсов в узлы для потока исследований
  );

  useEffect(() => {
    setNodes((lastNodes) => {
      const map = new Map(lastNodes.map((node) => [node.id, node]));
      // Обновление узлов с учетом изменений в данных карты курсов
      return coursesMap.map((newNode) =>
        createFlowNode(newNode, map.get(newNode.id) as FlowNode)
      );
    });
  }, [coursesMap, setNodes]);

  // Возвращение состояния узлов и функции обновления узлов
  return { nodes, onNodesChange };
}
