'use client';

import { cn } from '@/shared/ui/utils';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from 'reactflow';
import css from './flow.module.css';
import { BG_CLASS_NAME } from '../_constant';
import { CoursesMapNode } from '../_domain/types';
import { coursesMapApi } from '../_api';

// Начальные данные для узлов и связей в потоке данных
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// Компонент Flow, отображающий визуальный поток данных с помощью ReactFlow
export function Flow({
  coursesMap: defaultCoursesMap, // Свойство coursesMap содержит данные о карте курсов
}: {
  coursesMap: CoursesMapNode[]; // Типизация свойства coursesMap
}) {
  // Получение данных о карте курсов с помощью хука useQuery из API
  const { data: coursesMap } = coursesMapApi.coursesMap.get.useQuery(
    undefined,
    {
      initialData: defaultCoursesMap, // Исходные данные карты курсов
    }
  );

  console.log(coursesMap); // Вывод данных о карте курсов в консоль

  // Использование хуков useNodesState и useEdgesState для управления узлами и связями в потоке данных
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Возвращение JSX компонента Flow
  return (
    <div className={cn('fixed inset-0 flex flex-col', css.root)}>
      {' '}
      {/* Корневой контейнер компонента с использованием стилей */}
      <ReactFlow
        nodes={nodes} // Узлы потока данных
        edges={edges} // Связи между узлами
        onNodesChange={onNodesChange} // Обработчик изменения узлов
        onEdgesChange={onEdgesChange} // Обработчик изменения связей
      >
        <Controls // Контролы для управления потоком данных
          className={cn(
            BG_CLASS_NAME, // Класс для заднего фона контролов
            'text-primary fill-primary shadow border', // Классы для текста, заливки, тени и границ контролов
            '[&>button]:border [&>button]:border-border' // Классы для границ кнопок контролов
          )}
        />
        <MiniMap // Мини-карта для обзора потока данных
          nodeBorderRadius={4} // Радиус границ узлов на мини-карте
          className={cn(
            BG_CLASS_NAME, // Класс для заднего фона мини-карты
            'text-primary fill-primary border border-border' // Классы для текста, заливки и границ мини-карты
          )}
          maskColor="hsl(var(--primary) / 0.1)" // Цвет маски мини-карты
          nodeColor={(node) => 'hsl(var(--primary) / 0.8)'} // Цвет узлов на мини-карте
        />
        <Background variant={BackgroundVariant.Dots} gap={40} size={1} />{' '}
        {/* Задний фон потока данных */}
      </ReactFlow>
    </div>
  );
}
