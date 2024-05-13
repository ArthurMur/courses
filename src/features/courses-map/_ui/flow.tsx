'use client';

import { cn } from '@/shared/ui/utils';
import ReactFlow, {
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from 'reactflow';
import css from './flow.module.css';
import { BG_CLASS_NAME } from '../_constant';
import { CoursesMapNode } from '../_domain/types';
import { useNodes } from '../_vm/nodes/use-nodes';
import { customNodes } from './nodes/custom-nodes';

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// Компонент Flow, отображающий визуальный поток данных с помощью ReactFlow
export function Flow({
  coursesMap: defaultCoursesMap, // Свойство coursesMap содержит данные о карте курсов
}: {
  coursesMap: CoursesMapNode[]; // Типизация свойства coursesMap
}) {
  const { nodes, onNodesChange } = useNodes(defaultCoursesMap);
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
        nodeTypes={customNodes} // Типы узлов
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
