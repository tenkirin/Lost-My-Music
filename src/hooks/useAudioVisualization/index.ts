/**
 * see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
 */

import { useRef } from 'react';

import { drawBackground, drawBars, drawFloats } from './drawUtils';
import { isFirefox } from '../../utils/browser';

import { FFT_SIZE } from '../../configs/audioConfigs';

import { AudioVisualizationConfig } from '../../types';

const useAudioVisualization = () => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const animationFrameIDRef = useRef<number>();

  const drawCanvas = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
    console.log(animationFrameIDRef.current);
    drawBackground(canvasEl);
    drawBars(canvasEl, frequencies);
    drawFloats(canvasEl, frequencies);
  };

  const drawEachFrame = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
    // draw for each animation frame
    animationFrameIDRef.current = requestAnimationFrame(
      () => drawEachFrame(canvasEl, frequencies)
    );  // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

    if (analyserRef.current) {
      // get data and fill frequencies array
      analyserRef.current.getByteFrequencyData(frequencies);  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

      drawCanvas(canvasEl, frequencies);
    }
  };

  const startVisualization = (stream: MediaStream, canvasEl: HTMLCanvasElement, config?: AudioVisualizationConfig) => {
    // cancel last time visualization
    cancelVisualization();

    // create Analyser
    audioCtxRef.current = new AudioContext(); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
    analyserRef.current = audioCtxRef.current.createAnalyser(); // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser

    // get audio stream source & connect to analyser & destination
    const source = audioCtxRef.current.createMediaStreamSource(stream); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource
    source.connect(analyserRef.current);  // https://developer.mozilla.org/en-US/docs/Web/API/AudioNode/connect
    // TODO: find out the root casue of this usage
    if (isFirefox) {
      source.connect(audioCtxRef.current.destination);
    }

    // frequencies array
    analyserRef.current.fftSize = FFT_SIZE;  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    const defaultLength = analyserRef.current.frequencyBinCount; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
    const bufferLength = Math.min(defaultLength, config?.barCount ?? Infinity);
    const frequencies = new Uint8Array(bufferLength); // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

    // draw for each frame
    drawEachFrame(canvasEl, frequencies);
  };

  const cancelVisualization = () => {
    if (animationFrameIDRef.current) {
      cancelAnimationFrame(animationFrameIDRef.current);
      animationFrameIDRef.current = 0;
    }
  };

  return {
    startVisualization,
    cancelVisualization,
    drawCanvas
  };
};

export default useAudioVisualization;
