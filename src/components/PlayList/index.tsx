import { FC, MouseEvent, MouseEventHandler, useState } from 'react';

import Uploader from '../Uploader';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { PlayListProps } from '../../types';

const PlayList: FC<PlayListProps> = ({ setAudioSrc }) => {
  // TODO: use Set & MD5 to eliminate duplication
  const [audios, setAudios] = useState<string[]>(PRESET_AUDIOS);

  const addAudios = (newAudio: string) => {
    setAudios([newAudio, ...audios]);
  };

  const onClick: MouseEventHandler<HTMLLIElement> = (evt: MouseEvent<HTMLLIElement>) => {
    const listItem = evt.target as HTMLLIElement;
    if (listItem) {
      const audioSrc = listItem.dataset.audioSrc;
      if (audioSrc) setAudioSrc(audioSrc);
    }
  };

  return (
    <div>
      <ul>
        {[...audios].map(audio => (
          <li
            key={audio}
            data-audio-src={audio}
            onClick={onClick}
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
