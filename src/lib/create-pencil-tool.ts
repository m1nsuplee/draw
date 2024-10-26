import type { Tool } from '../models/tool';

export function createPencilTool(): Tool {
  return {
    startDrawing(context, x, y) {
      context.beginPath();
      context.moveTo(x, y);
    },
    draw(context, x, y) {
      context.lineTo(x, y);
      context.stroke();
    },
    stopDrawing(context) {
      context.closePath();
    },
    type: 'pencil',
  };
}
