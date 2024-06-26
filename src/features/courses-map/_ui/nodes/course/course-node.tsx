/* eslint-disable @next/next/no-img-element */
import { cn } from '@/shared/ui/utils';
import { MdxCode } from '@/shared/lib/mdx';

import { Handle, NodeProps, Position } from 'reactflow';
import { Card, CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';
import type { CourseNode } from '../../../_domain/types';
import { useCoursesMapAbility } from '../../../_vm/lib/use-courses-map-ability';

export default function CourseNode(props: NodeProps<CourseNode>) {
  const ability = useCoursesMapAbility();
  return (
    <>
      {/* Добавляем ручку-приемник снизу */}
      <Handle type="target" position={Position.Bottom} />
      {/* Добавляем ручку-приемник сверху */}
      <Handle type="source" position={Position.Top} />
      {/* Оборачиваем содержимое в ссылку из Next.js */}
      <Link
        href={`#`}
        className="flex justify-center items-center"
        style={{
          width: `${props.data.width * props.data.scale}px`, // Ширина, зависящая от ширины узла и его масштаба
          height: `${props.data.height * props.data.scale}px`, // Высота, зависящая от высоты узла и его масштаба
        }}
      >
        {/* Карточка */}
        <Card
          className={cn(
            'shrink-0 shadow hover:shadow-lg cursor-pointer ',
            'transition-color hover:outline hover:outline-primary',
            props.selected &&
              ability?.canUpdateCoursesMap() &&
              'outline-primary outline ',
            props.data.hidden && 'opacity-50'
          )}
          style={{
            width: `${props.data.width}px`,
            height: `${props.data.height}px`,
            transform: `scale(${props.data.scale}) rotate(${props.data.rotation}deg) `,
            transformOrigin: 'center center',
          }}
        >
          <img
            className="w-full h-[150px] object-cover"
            src={props.data.thumbnail}
            loading="lazy"
            alt=""
          />
          {/* заголовок карточки */}
          <CardHeader>
            <CardTitle>{props.data.title}</CardTitle>
            {props.data.shortDescription && (
              <MdxCode code={props.data.shortDescription} size="sm" />
            )}
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
