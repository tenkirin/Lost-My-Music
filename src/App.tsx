import { FC } from 'react';

import Player from './components/Player';

import lmmSrc from './assets/平野綾 - Lost my music.flac';
import gkSrc from './assets/平野綾 - God knows....flac';
import wyaSrc from './assets/ONE OK ROCK - Wherever you are.flac';
import kzkkdSrc from './assets/ONE OK ROCK - 完全感覚Dreamer.flac';

const App: FC = () => (
  <main>
    <h1>Lost My Music</h1>
    <canvas id="canvas" width={1080} height={675} />
    <Player audioSrc={lmmSrc} />
    <Player audioSrc={gkSrc} />
    <Player audioSrc={wyaSrc} />
    <Player audioSrc={kzkkdSrc} />
  </main>
);

export default App;
