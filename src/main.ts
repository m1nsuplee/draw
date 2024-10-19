const CANVAS_ID = 'canvas';

const NEXT_BUTTON_ID = 'next-button';

function isCanvasElement(element: HTMLElement | null): element is HTMLCanvasElement {
  if (!element) {
    return false;
  }

  return element.tagName === 'CANVAS';
}

function isButtonElement(element: HTMLElement | null): element is HTMLButtonElement {
  if (!element) {
    return false;
  }

  return element.tagName === 'BUTTON';
}

function initApp(): void {
  const canvas: HTMLCanvasElement = (() => {
    const canvas = document.getElementById(CANVAS_ID);

    if (!isCanvasElement(canvas)) {
      throw new Error(`id가 ${CANVAS_ID}인 요소가 <canvas>가 아닙니다.`);
    }

    return canvas;
  })();

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('2d context를 가져올 수 없습니다.');
  }

  const nextButton: HTMLButtonElement = (() => {
    const button = document.getElementById(NEXT_BUTTON_ID);

    if (!isButtonElement(button)) {
      throw new Error(`id가 ${NEXT_BUTTON_ID}인 요소가 <button>이 아닙니다.`);
    }

    return button;
  })();

  let step = 0;

  nextButton.addEventListener('click', () => {
    console.log({ canvas, context });

    switch (step) {
      case 0:
        context.beginPath();
        break;
      case 1:
        context.arc(100, 100, 50, 0, Math.PI * 2);
        break;
      case 2:
        context.fill();
        break;
      default:
        throw new Error('알 수 없는 step입니다.');
    }

    step++;
  });
}

initApp();
