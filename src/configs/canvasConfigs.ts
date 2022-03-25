import { AudioVisualizationConfig } from '../types';

export const CANVAS_WIDTH = 720;
export const CANVAS_HEIGHT = 405;
export const CANVAS_BGCOLOR = 'rgb(29, 19, 62)';

// X_RATIO = barWidth/spanWidth
export const X_RATIO = 0.8;

// Y_RATIO = maxBarHeight/canvasHeight
export const Y_RATIO = 0.9;

export const FLOAT_COLOR = '#3e47a0';
export const FLOAT_HEIGHT = 4;
export const PUSH_DISTANCE = 10;
export const DROP_DISTANCE = 1;

export const BAR_COLOR_STOPS: [number, string][] = [
  [0, '#68b3ec'],
  [0.5, '#4c60cb'],
  [1, '#68b3ec'],
];

export const VISUAL_CONFIG: AudioVisualizationConfig = {
  barCount: 80
};
