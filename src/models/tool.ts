type ToolType = 'pencil' | 'eraser';

export interface Tool {
  startDrawing(context: CanvasRenderingContext2D, x: number, y: number): void;
  draw(context: CanvasRenderingContext2D, x: number, y: number): void;
  stopDrawing(context: CanvasRenderingContext2D): void;
  type: ToolType;
}