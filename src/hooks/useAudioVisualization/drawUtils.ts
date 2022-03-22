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

    // draw numbers
    canvasCtx.fillStyle = `rgb(${255 - freq}, 255, 255)`;
    canvasCtx.fillText(String(i), x, y); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
  }
};
