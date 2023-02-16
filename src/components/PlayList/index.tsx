import { FC, memo, useState } from 'react';

import Uploader from '../Uploader';
import PlayListItem from '../PlayListItem';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { cls } from '../../utils/misc';

import { AudioInfo, PlayListProps, UploaderProps } from '../../types';

import styles from './styles.module.scss';
import parentStyles from '../Player/styles.module.scss';

const PlayList: FC<PlayListProps> = memo(({ setCurrentAudio, currentAudio }) => {
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
    <div className={cls(styles.playlist, parentStyles.playlist)}>
      <h2>Playlist</h2>

      <ul>
        {audios.map(({ name, src }) => (
          <PlayListItem
            key={src}
            content={name}
            onClick={() => setCurrentAudio({ name, src })}
            className={cls(
              src === currentAudio.src && 'selected',
            )}
          />
        ))}
      </ul>

      <Uploader addAudios={addAudios} />
    </div>
  );
});

PlayList.displayName = 'PlayList';

export default PlayList;
