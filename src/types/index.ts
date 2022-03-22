export interface AudioVisualizationConfig {
  barCount: number;
}

export interface PlayerProps {
  audioSrc: string;
};

export interface CanvasData {
  canvasCtx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
}
