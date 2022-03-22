export const drawCanvas = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
  const canvasCtx = canvasEl.getContext('2d');  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
  if (!canvasCtx) return;

  const { width, height } = canvasEl;

  // draw background
  canvasCtx.fillStyle = '#ccc'; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
  canvasCtx.fillRect(0, 0, width, height); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect

  const xRatio = 0.7, yRatio = 0.9;
  const spanWidth = width / frequencies.length;
  const barWidth = spanWidth * xRatio;

  for (const [i, freq] of frequencies.entries()) {
    const heightRatio = freq / 255;
    const barHeight = height * heightRatio * yRatio;

    const x = spanWidth * i;
    const y = height - barHeight;

    // draw bars
    canvasCtx.fillStyle = `rgb(${freq}, 255, 255)`;
    canvasCtx.fillRect(x, y, barWidth, barHeight);
  }
};

// config constants
const FLOAT_HEIGHT = 4;
const PUSH_DISTANCE = 10;
const DROP_DISTANCE = 1;

const floatYs: number[] = [];
export const drawFloats = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
  const canvasCtx = canvasEl.getContext('2d');
  if (!canvasCtx) return;

  const { width, height } = canvasEl;

  const xRatio = 0.7, yRatio = 0.9;
  const spanWidth = width / frequencies.length;
  const floatWidth = spanWidth * xRatio;

  // compute the y coordinate for each float
  for (const [i, freq] of frequencies.entries()) {
    const heightRatio = freq / 255;
    const barHeight = height * heightRatio * yRatio;
    const minY = barHeight + FLOAT_HEIGHT;

    // set default for the first time
    floatYs[i] = floatYs[i] ?? minY;

    // update states of current frame
    floatYs[i] = freq > floatYs[i]
      ? minY + PUSH_DISTANCE
      : Math.max(minY, floatYs[i] - DROP_DISTANCE);
  }

  for (const [i, floatY] of floatYs.entries()) {
    const x = spanWidth * i;
    const y = height - floatY;

    // draw floats
    canvasCtx.fillStyle = 'teal';
    canvasCtx.fillRect(x, y, floatWidth, FLOAT_HEIGHT);
  }
};
