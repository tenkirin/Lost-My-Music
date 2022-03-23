import { FC } from 'react';

import Player from './components/Player';

import lmmSrc from './assets/平野綾 - Lost my music.flac';

const App: FC = () => (
  <main>
    <h1>Lost My Music</h1>
    <Player audioSrc={lmmSrc} />
  </main>
);

export default App;
