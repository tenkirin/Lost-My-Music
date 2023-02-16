/**
 * see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
 */

import { useCallback, useRef } from 'react';

import { drawBackground, drawBars, drawFloats } from './drawUtils';

import { isFirefox } from '../../utils/browser';

import { FFT_SIZE } from '../../configs/audioConfigs';
import { FLOAT_HEIGHT } from '../../configs/canvasConfigs';

import { AudioVisualizationConfig } from '../../types';

const useAudioVisualization = (config?: AudioVisualizationConfig) => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const animationFrameIDRef = useRef<number>();
  const floatYs = useRef<number[]>([]);

  const drawCanvas = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
    drawBackground(canvasEl);
    drawBars(canvasEl, frequencies);
    drawFloats(canvasEl, frequencies, floatYs.current);
  };

  const drawEachFrame = useCallback((audioEl: HTMLAudioElement, canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
    if (analyserRef.current) {
      // get data and fill frequencies array
      analyserRef.current.getByteFrequencyData(frequencies);  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

      drawCanvas(canvasEl, frequencies);

      const isAllSettled = floatYs.current.every(floatY => floatY === FLOAT_HEIGHT);
      const isPlaying = !audioEl.paused && !audioEl.ended; // https://stackoverflow.com/a/6877530
      if (isPlaying || !isAllSettled) {
        // draw for each animation frame until all floats settled
        animationFrameIDRef.current = requestAnimationFrame(
          () => drawEachFrame(audioEl, canvasEl, frequencies)
        );  // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
      }
    }
  }, []);

  const cancelVisualization = useCallback(() => {
    if (animationFrameIDRef.current) {
      cancelAnimationFrame(animationFrameIDRef.current);
      animationFrameIDRef.current = 0;
    }
  }, []);

  const startVisualization = useCallback((audioEl: HTMLAudioElement, canvasEl: HTMLCanvasElement) => {
    // cancel last time visualization to avoid mixed animation: only one animation at the same time
    cancelVisualization();

    // create Analyser
    audioCtxRef.current = new AudioContext(); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
    analyserRef.current = audioCtxRef.current.createAnalyser(); // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream#firefox-specific_notes
    // https://stackoverflow.com/a/68044674
    // https://stackoverflow.com/a/48623627
    const stream = (audioEl as any).captureStream?.() ?? (audioEl as any).mozCaptureStream?.();

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
    drawEachFrame(audioEl, canvasEl, frequencies);
  }, [cancelVisualization, config?.barCount, drawEachFrame]);

  const initVisualization = useCallback((canvasEl: HTMLCanvasElement) => {
    const defaultLength = FFT_SIZE / 2; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount#value
    const bufferLength = Math.min(defaultLength, config?.barCount ?? Infinity);
    drawCanvas(canvasEl, new Uint8Array(bufferLength).fill(0));
  }, [config?.barCount]);

  return {
    initVisualization,
    startVisualization,
    cancelVisualization,
  };
};

export default useAudioVisualization;
