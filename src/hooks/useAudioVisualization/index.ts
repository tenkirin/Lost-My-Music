/**
 * see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
 */

import { useRef } from 'react';
import { drawCanvas } from './drawUtils';

const useAudioVisualization = (selector: string) => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();

  const drawEachFrame = (canvasEl: HTMLCanvasElement, frequencies: Uint8Array) => {
    // draw for each animation frame
    requestAnimationFrame(() => drawEachFrame(canvasEl, frequencies));  // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

    if (analyserRef.current) {
      // get data and fill frequencies array
      analyserRef.current.getByteFrequencyData(frequencies);  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

      drawCanvas(canvasEl, frequencies);
    }
  };

  const visualize = (stream: MediaStream) => {
    const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
    if (!canvasEl) throw new Error('canvas element not found');

    // create Analyser
    audioCtxRef.current = new AudioContext(); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
    analyserRef.current = audioCtxRef.current.createAnalyser(); // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser

    // get audio stream source & connect to analyser & destination
    const source = audioCtxRef.current.createMediaStreamSource(stream); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource
    source
      .connect(analyserRef.current)
      .connect(audioCtxRef.current.destination); // https://developer.mozilla.org/en-US/docs/Web/API/AudioNode/connect

    // frequencies array
    analyserRef.current.fftSize = 256;  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    const bufferLength = analyserRef.current.frequencyBinCount; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
    const frequencies = new Uint8Array(bufferLength); // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

    // draw for each frame
    drawEachFrame(canvasEl, frequencies);
  };

  return { visualize };
};

export default useAudioVisualization;
