import type { Tool } from '../models/tool';

export function createEraserTool(): Tool {
  return {
    startDrawing(context, x, y) {
      context.save();
      context.globalCompositeOperation = 'destination-out';
      context.beginPath();
      context.moveTo(x, y);
    },
    draw(context, x, y) {
      context.lineTo(x, y);
      context.stroke();
    },
    stopDrawing(context) {
      context.closePath();
      context.restore();
    },
    type: 'eraser',
  };
}
