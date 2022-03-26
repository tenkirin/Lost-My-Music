import lmmSrc from '../assets/平野綾 - Lost my music.flac';
import gkSrc from '../assets/平野綾 - God knows....flac';
import wyaSrc from '../assets/ONE OK ROCK - Wherever you are.flac';
import kzkkdSrc from '../assets/ONE OK ROCK - 完全感覚Dreamer.flac';

import { AudioInfo } from '../types';

export const FREQUENCY = 255; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData

export const FFT_SIZE = 256; // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize

export const ACCEPT_AUDIO_FORMATS = [
  'audio/flac',
  'audio/mpeg',
  'audio/wav',
].join();

const getFileName: (name: string) => string = filename => filename.slice(
  filename.lastIndexOf('/') + 1,
  filename.lastIndexOf('.', filename.lastIndexOf('.') - 1), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf#parameters
);

export const PRESET_AUDIOS: AudioInfo[] = [
  {
    name: getFileName(lmmSrc),
    src: lmmSrc,
  },
  {
    name: getFileName(gkSrc),
    src: gkSrc,
  }, {
    name: getFileName(wyaSrc),
    src: wyaSrc,
  }, {
    name: getFileName(kzkkdSrc),
    src: kzkkdSrc,
  },
];
