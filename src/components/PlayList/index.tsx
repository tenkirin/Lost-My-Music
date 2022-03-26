import { FC, useState } from 'react';

import Uploader from '../Uploader';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { PlayListProps } from '../../types';

import styles from './styles.module.scss';
import parentStyles from '../Player/styles.module.scss';

const PlayList: FC<PlayListProps> = ({ setAudioSrc, currentAudio }) => {
  // TODO: use Set & MD5 to eliminate duplication
  const [audios, setAudios] = useState<string[]>(PRESET_AUDIOS);

  const addAudios = (newAudio: string) => {
    setAudios([newAudio, ...audios]);
  };

  return (
    <div className={`${styles.playlist} ${parentStyles.playlist}`}>
      <ul>
        {[...audios].map(audio => (
          <li
            key={audio}
            onClick={() => setAudioSrc(audio)}
            className={audio === currentAudio ? 'selected' : ''}
          >
            {audio}
          </li>
        ))}
      </ul>

      <Uploader addAudios={addAudios} />
    </div>
  );
};

export default PlayList;
