import { useNodesState } from 'reactflow';
import { coursesMapApi } from '../../_api';
import { CoursesMapNode } from '../../_domain/types';
import { createFlowNode } from './flow-node';

// Объявление пользовательского хука useNodes с параметром defaultCoursesMap
export function useNodes(defaultCoursesMap: CoursesMapNode[]) {
  // Получение данных о карте курсов с помощью API
  const { data: coursesMap } = coursesMapApi.coursesMap.get.useQuery(
    undefined, // Передача параметров запроса (в данном случае не используется)
    {
      initialData: defaultCoursesMap, // Исходные данные для карты курсов
    }
  );
  // Инициализация состояния узлов с помощью хука useNodesState
  const [nodes, setNodes, onNodesChange] = useNodesState(
    coursesMap.map((data) => createFlowNode(data)) // Преобразование данных карты курсов в узлы для потока исследований
  );
  // Возвращение состояния узлов и функции обновления узлов
  return { nodes, onNodesChange };
}
