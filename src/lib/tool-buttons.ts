import type { Tool } from '../models/tool';
import { getButtonElementById } from './utils';

const pencilButton = getButtonElementById('pencil-button');
const eraserButton = getButtonElementById('eraser-button');

export const toolButtons: (HTMLButtonElement & { toolType: Tool['type'] })[] = [
  Object.assign(pencilButton, { toolType: 'pencil' as Tool['type'] }),
  Object.assign(eraserButton, { toolType: 'eraser' as Tool['type'] }),
];
