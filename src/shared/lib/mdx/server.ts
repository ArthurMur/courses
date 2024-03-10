import { bundleMDX } from 'mdx-bundler';

// Обертка над библой, что здесь менять свойства
export const compileMDX = (file: string) => bundleMDX({ source: file });
