import { Dispatch, SetStateAction } from 'react';

export interface AudioVisualizationConfig {
  barCount: number;
}

export interface CanvasData {
  canvasCtx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
}

export interface UploaderProps {
  addAudios: (newAudio: string) => void;
}

export interface PlayListProps {
  setAudioSrc: Dispatch<SetStateAction<string>>;
}
