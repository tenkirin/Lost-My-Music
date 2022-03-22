import { FREQUENCY } from '../../configs/audioConfigs';
import {
  X_RATIO,
  Y_RATIO,
  FLOAT_HEIGHT,
  PUSH_DISTANCE,
  DROP_DISTANCE,
  FLOAT_COLOR,
  CANVAS_BGCOLOR
} from '../../configs/canvasConfigs';

import { CanvasData } from '../../types';

const getCanvasData = (canvasEl: HTMLCanvasElement): CanvasData => {
  const canvasCtx = canvasEl.getContext('2d');  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
  if (!canvasCtx) throw new Error('no canvas context');

  const { width: canvasWidth, height: canvasHeight } = canvasEl;

  return {
    canvasCtx,
    canvasWidth,
    canvasHeight,
  };
};

const getBarWidth = (canvasWidth: number, barCount: number) => {
  const spanWidth = canvasWidth / barCount;
  const barWidth = spanWidth * X_RATIO;

  return {
    spanWidth,
    barWidth,
  };
};

const getBarHeight = (freq: number, canvasHeight: number) => {
  const heightRatio = freq / FREQUENCY;
  const barHeight = canvasHeight * heightRatio * Y_RATIO;

  return barHeight;
};

export const drawBars = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
  const { canvasCtx, canvasWidth, canvasHeight } = getCanvasData(canvasEl);
  const { spanWidth, barWidth } = getBarWidth(canvasWidth, frequencies.length);

  for (const [i, freq] of frequencies.entries()) {
    const barHeight = getBarHeight(freq, canvasHeight);
    const x = spanWidth * i;
    const y = canvasHeight - barHeight;

    // draw bars
    canvasCtx.fillStyle = `rgb(${freq}, 255, 255)`;
    canvasCtx.fillRect(x, y, barWidth, barHeight);
  }
};

const floatYs: number[] = [];
export const drawFloats = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
  const { canvasCtx, canvasWidth, canvasHeight } = getCanvasData(canvasEl);
  const { spanWidth, barWidth: floatWidth } = getBarWidth(canvasWidth, frequencies.length);

  // compute the y coordinate for each float
  for (const [i, freq] of frequencies.entries()) {
    const barHeight = getBarHeight(freq, canvasHeight);
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
    const y = canvasHeight - floatY;

    // draw floats
    canvasCtx.fillStyle = FLOAT_COLOR;
    canvasCtx.fillRect(x, y, floatWidth, FLOAT_HEIGHT);
  }
};

export const drawCanvas = (canvasEl: HTMLCanvasElement) => {
  const { canvasCtx, canvasWidth, canvasHeight } = getCanvasData(canvasEl);

  // draw background
  canvasCtx.fillStyle = CANVAS_BGCOLOR; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
};
