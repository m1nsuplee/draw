import { TOOL_TYPES } from '../constants/tool';

type ToolType = (typeof TOOL_TYPES)[keyof typeof TOOL_TYPES];

export interface Tool {
  startDrawing(context: CanvasRenderingContext2D, x: number, y: number): void;
  draw(context: CanvasRenderingContext2D, x: number, y: number): void;
  stopDrawing(context: CanvasRenderingContext2D): void;
  type: ToolType;
}
