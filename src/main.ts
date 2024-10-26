import { CANVAS_IDS } from './constants/canvas-ids';
import { type Tool } from './models/tool';
import { toolButtons } from './lib/tool-buttons';
import { toolFactory } from './lib/tool-factory';
import { isValidToolType } from './lib/type-guard';
import { getCanvas2DWithContext } from './lib/utils';

(function initApp(): void {
  const { canvas, context } = getCanvas2DWithContext(CANVAS_IDS.DEFAULT);

  let isDrawing = false;

  const changeTool = (tool: Tool) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tool', tool.type);
    window.history.pushState({}, '', url);
  };

  const getCurrentTool = (): Tool => {
    const url = new URL(window.location.href);
    const tool: string = (() => {
      const tool = url.searchParams.get('tool');

      return tool ? tool : 'pencil';
    })();

    if (!isValidToolType(tool)) {
      throw new Error('tool이 올바르지 않습니다.');
    }

    const createTool = toolFactory[tool];
    const currentTool = createTool();

    return currentTool;
  };

  toolButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const createTool = toolFactory[button.toolType];
      const currentTool = createTool();

      changeTool(currentTool);
    });
  });

  canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;

    const { clientX, clientY } = event;
    const { left, top } = canvas.getBoundingClientRect();

    const currentTool = getCurrentTool();

    currentTool.startDrawing(context, clientX - left, clientY - top);
  });

  canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) {
      return;
    }

    const { left, top } = canvas.getBoundingClientRect();

    const currentTool = getCurrentTool();

    currentTool.draw(context, event.clientX - left, event.clientY - top);
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;

    const currentTool = getCurrentTool();

    currentTool.stopDrawing(context);
  });

  canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();

    isDrawing = true;

    const { touches } = event;
    const { clientX, clientY } = touches[0];
    const { left, top } = canvas.getBoundingClientRect();

    const currentTool = getCurrentTool();

    currentTool.startDrawing(context, clientX - left, clientY - top);
  });

  canvas.addEventListener('touchmove', ({ touches }) => {
    if (!isDrawing) {
      return;
    }

    const { clientX, clientY } = touches[0];
    const { left, top } = canvas.getBoundingClientRect();

    const currentTool = getCurrentTool();

    currentTool.draw(context, clientX - left, clientY - top);
  });

  canvas.addEventListener('touchend', () => {
    const currentTool = getCurrentTool();

    isDrawing = false;
    currentTool.stopDrawing(context);
  });
})();
