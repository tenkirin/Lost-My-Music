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
  addAudios: (newAudio: AudioInfo | AudioInfo[]) => void;
}

export interface PlayListProps {
  setCurrentAudio: Dispatch<SetStateAction<AudioInfo>>;
  currentAudio: AudioInfo;
}

export interface AudioInfo {
  name: string;
  src: string;
}
