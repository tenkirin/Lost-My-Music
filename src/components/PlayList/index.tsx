import { FC, useState } from 'react';

import Uploader from '../Uploader';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { AudioInfo, PlayListProps, UploaderProps } from '../../types';

import styles from './styles.module.scss';
import parentStyles from '../Player/styles.module.scss';

const PlayList: FC<PlayListProps> = ({ setCurrentAudio, currentAudio }) => {
  // TODO: use Set & MD5 to eliminate duplication
  const [audios, setAudios] = useState<AudioInfo[]>(PRESET_AUDIOS);

  const addAudios: UploaderProps['addAudios'] = newAudio => {
    if (Array.isArray(newAudio)) {
      setAudios([...newAudio, ...audios]);
    } else {
      setAudios([newAudio, ...audios]);
    }
  };

  return (
    <div className={`${styles.playlist} ${parentStyles.playlist}`}>
      <h2>Playlist</h2>

      <ul>
        {audios.map(({ name, src }) => (
          <li
            key={src}
            onClick={() => setCurrentAudio({ name, src })}
            className={src === currentAudio.src ? 'selected' : ''}
          >
            {name}
          </li>
        ))}
      </ul>

      <Uploader addAudios={addAudios} />
    </div>
  );
};

export default PlayList;
