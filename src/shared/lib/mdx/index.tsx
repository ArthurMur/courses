import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { cva } from 'class-variance-authority';

// Создает классы CSS для компонента MDX
const variants = cva('prose dark:prose-invert prose-slate', {
  variants: {
    size: {
      lg: 'prose-lg',
      md: 'prose',
      sm: 'prose-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Принимает код MDX и возвращает компонент MDX
export function useMdxComponent(code: string) {
  // Используем хук useMemo для оптимизации рендеринга компонента MDX
  return useMemo(() => {
    // Создаем компонент MDX с помощью функции getMDXComponent
    const Component = getMDXComponent(code, {});

    // Определяем компонент MdxComponent, который принимает пропсы className и size
    return function MdxComponent({
      className,
      size,
    }: {
      className?: string;
      size?: 'lg' | 'md' | 'sm';
    }) {
      // Возвращаем компонент MDX, обернутый в div с классами CSS, созданными функцией variants
      return (
        <div
          className={variants({
            className,
            size,
          })}
        >
          <Component />
        </div>
      );
    };
  }, [code]); // Зависимостью хука useMemo является код MDX
}
