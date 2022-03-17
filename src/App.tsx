import { FC } from 'react';

import Player from './components/Player';

import lmmSrc from './assets/平野綾 - Lost my music.flac';
import gkSrc from './assets/平野綾 - God knows....flac';

const App: FC = () => (
  <main>
    <h1>Lost My Music</h1>
    <Player audioSrc={lmmSrc} />
    <Player audioSrc={gkSrc} />
  </main>
);

export default App;
