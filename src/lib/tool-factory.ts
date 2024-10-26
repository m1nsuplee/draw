import { createEraserTool } from './create-eraser-tool';
import { createPencilTool } from './create-pencil-tool';
import { type Tool } from '../models/tool';

export const toolFactory: Record<Tool['type'], () => Tool> = {
  pencil: createPencilTool,
  eraser: createEraserTool,
};
