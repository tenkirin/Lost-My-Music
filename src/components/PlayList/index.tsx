import { FC, useState } from 'react';

import Uploader from '../Uploader';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { PlayListProps } from '../../types';

const PlayList: FC<PlayListProps> = ({ setAudioSrc }) => {
  // TODO: use Set & MD5 to eliminate duplication
  const [audios, setAudios] = useState<string[]>(PRESET_AUDIOS);

  const addAudios = (newAudio: string) => {
    setAudios([newAudio, ...audios]);
  };

  return (
    <div>
      <ul>
        {[...audios].map(audio => (
          <li
            key={audio}
            onClick={() => setAudioSrc(audio)}
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
