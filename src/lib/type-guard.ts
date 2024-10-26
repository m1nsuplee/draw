import { type Tool } from '../models/tool';

export function isValidToolType(type: string): type is Tool['type'] {
  const toolTypes: Tool['type'][] = ['pencil', 'eraser'] as const;

  return toolTypes.includes(type as Tool['type']);
}
