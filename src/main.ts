import { CANVAS_IDS } from './constants/canvas-ids';
import { type Tool } from './models/tool';
import { toolButtons } from './lib/tool-buttons';
import { toolFactory } from './lib/tool-factory';
import { isValidToolType } from './lib/type-guard';
import { getCanvas2DWithContext } from './lib/utils';
import { TOOL_QUERY_STRING_KEY, TOOL_TYPES } from './constants/tool';

(function initApp(): void {
  const { canvas, context } = getCanvas2DWithContext(CANVAS_IDS.default);

  let isDrawing = false;

  const changeTool = (tool: Tool): void => {
    const url = new URL(window.location.href);
    url.searchParams.set('tool', tool.type);
    window.history.pushState({}, '', url);
  };

  const getCurrentTool = (): Tool => {
    const url = new URL(window.location.href);
    const toolType: Tool['type'] = (() => {
      const toolTypeQuery = url.searchParams.get(TOOL_QUERY_STRING_KEY) ?? TOOL_TYPES.pencil;

      if (!isValidToolType(toolTypeQuery)) {
        throw new Error('tool의 타입이 유효하지 않습니다.');
      }

      return toolTypeQuery;
    })();

    const createTool = toolFactory[toolType];
    const tool = createTool();

    return tool;
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
    isDrawing = false;

    const currentTool = getCurrentTool();

    currentTool.stopDrawing(context);
  });
})();
