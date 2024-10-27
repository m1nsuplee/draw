import { TOOL_TYPES } from '../constants/tool';
import { type Tool } from '../models/tool';

export function isValidToolType(type: string): type is Tool['type'] {
  const toolTypes = Object.values(TOOL_TYPES);

  return toolTypes.includes(type as Tool['type']);
}
