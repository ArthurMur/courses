import { useReactFlow } from 'reactflow';

// Хук для получения координат центра экрана в координатах flow
export function useGetScreenCenter() {
  const reactFlow = useReactFlow(); // Получение объекта ReactFlow из контекста

  // Функция для вычисления координат центра экрана
  return ({ height = 0, width = 0 }: { width?: number; height?: number }) => {
    // Вычисление координат центра экрана с учетом размеров узла
    const screenCenterX = document.documentElement.clientWidth / 2 - width / 2;
    const screenCenterY =
      document.documentElement.clientHeight / 2 - height / 2;

    // Преобразование координат экрана в координаты flow
    return reactFlow.screenToFlowPosition({
      x: screenCenterX,
      y: screenCenterY,
    });
  };
}
