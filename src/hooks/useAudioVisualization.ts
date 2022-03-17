/**
 * see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
 */

import { useRef } from 'react';

const useAudioVisualization = (selector: string) => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();

  const drawCanvas = (
    canvasCtx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    frequencies: Uint8Array
  ) => {
    const xRatio = 0.7, yRatio = 0.9;

    const spanWidth = canvasWidth / frequencies.length;
    const barWidth = spanWidth * xRatio;

    for (const [i, freq] of frequencies.entries()) {
      const heightRatio = freq / 255;
      const barHeight = canvasHeight * heightRatio * yRatio;

      const x = spanWidth * i;
      const y = canvasHeight - barHeight;

      // draw bars
      canvasCtx.fillStyle = `rgb(${freq}, 255, 255)`; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
      canvasCtx.fillRect(x, y, barWidth, barHeight);  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect

      // draw numbers
      canvasCtx.fillStyle = `rgb(${255 - freq}, 255, 255)`;
      canvasCtx.fillText(String(i), x, y); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
    }
  };

  const draw = (
    canvasCtx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    frequencies: Uint8Array
  ) => {
    requestAnimationFrame(() => draw(canvasCtx, canvasWidth, canvasHeight, frequencies));

    if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(frequencies);  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

      // draw background
      canvasCtx.fillStyle = '#ccc';
      canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

      // draw shapes
      drawCanvas(canvasCtx, canvasWidth, canvasHeight, frequencies);
    }
  };

  const visualize = (stream: MediaStream) => {
    const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
    if (!canvasEl) throw new Error('canvas element not found');

    // create Analyser
    audioCtxRef.current = new AudioContext(); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
    analyserRef.current = audioCtxRef.current.createAnalyser(); // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser

    // get audio stream source
    const source = audioCtxRef.current.createMediaStreamSource(stream); // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource
    source.connect(analyserRef.current);

    // visualize
    analyserRef.current.fftSize = 256;  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    const bufferLength = analyserRef.current.frequencyBinCount; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
    const frequencies = new Uint8Array(bufferLength); // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

    const { width, height } = canvasEl;
    const canvasCtx = canvasEl.getContext('2d');  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, width, height);
      draw(canvasCtx, width, height, frequencies); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
    }
  };

  return { visualize };
};

export default useAudioVisualization;
