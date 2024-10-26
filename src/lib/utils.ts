function isCanvasElement(element: HTMLElement | null): element is HTMLCanvasElement {
  if (!element) {
    return false;
  }

  return element.tagName === 'CANVAS';
}

export function getCanvas2DWithContext(canvasId: string): {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
} {
  const canvas = document.getElementById(canvasId);

  if (!isCanvasElement(canvas)) {
    throw new Error(`id가 "${canvasId}"인 요소가 존재하지 않거나, <canvas>가 아닙니다.`);
  }

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('2d context를 가져올 수 없습니다.');
  }

  return { canvas, context };
}

export function getButtonElementById(buttonId: string): HTMLButtonElement {
  const button = document.getElementById(buttonId);

  if (!button) {
    throw new Error(`id가 ${buttonId}인 요소가 존재하지 않습니다.`);
  }

  return button as HTMLButtonElement;
}
