import type { Tool } from '../models/tool';

export const TOOL_TYPES: Record<Tool['type'], Tool['type']> = {
  pencil: 'pencil',
  eraser: 'eraser',
};

export const TOOL_QUERY_STRING_KEY = 'tool';
