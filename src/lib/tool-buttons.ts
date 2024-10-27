import { BUTTON_IDS } from '../constants/button-ids';
import type { Tool } from '../models/tool';
import { getButtonElementById } from './utils';

const pencilButton = getButtonElementById(BUTTON_IDS.pencil);
const eraserButton = getButtonElementById(BUTTON_IDS.eraser);

export const toolButtons: (HTMLButtonElement & { toolType: Tool['type'] })[] = [
  Object.assign(pencilButton, { toolType: 'pencil' as Tool['type'] }),
  Object.assign(eraserButton, { toolType: 'eraser' as Tool['type'] }),
];
