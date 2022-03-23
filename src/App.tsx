import { FC } from 'react';

import Player from './components/Player';

import styles from './styles.module.scss';

import lmmSrc from './assets/平野綾 - Lost my music.flac';

const App: FC = () => (
  <main className={styles.app}>
    <h1>Lost My Music</h1>
    <Player audioSrc={lmmSrc} />
  </main>
);

export default App;
