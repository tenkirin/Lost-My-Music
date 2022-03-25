import { FC } from 'react';

import Player from './components/Player';

import styles from './styles.module.scss';

const App: FC = () => (
  <main className={styles.app}>
    <h1>Lost My Music</h1>
    <Player />
  </main>
);

export default App;
