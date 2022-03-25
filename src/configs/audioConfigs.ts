import lmmSrc from '../assets/平野綾 - Lost my music.flac';
import gkSrc from '../assets/平野綾 - God knows....flac';
import wyaSrc from '../assets/ONE OK ROCK - Wherever you are.flac';
import kzkkdSrc from '../assets/ONE OK ROCK - 完全感覚Dreamer.flac';

export const FREQUENCY = 255; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

export const FFT_SIZE = 256; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize

export const ACCEPT_AUDIO_FORMATS = [
  'audio/flac',
  'audio/mpeg',
  'audio/wav',
].join();

export const PRESET_AUDIOS = [
  lmmSrc,
  gkSrc,
  wyaSrc,
  kzkkdSrc,
];
