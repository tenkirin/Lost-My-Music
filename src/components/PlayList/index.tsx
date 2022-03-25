import { FC, MouseEvent, MouseEventHandler, useState } from 'react';

import Uploader from '../Uploader';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { HanlderFactory, PlayListProps } from '../../types';

const PlayList: FC<PlayListProps> = ({ setAudioSrc }) => {
  // TODO: use Set & MD5 to eliminate duplication
  const [audios, setAudios] = useState<string[]>(PRESET_AUDIOS);

  const addAudios = (newAudio: string) => {
    setAudios([newAudio, ...audios]);
  };

  const getOnClick: HanlderFactory<MouseEventHandler> = (...scopeArgs) => {
    const [audio] = scopeArgs;
    const onClick: MouseEventHandler<HTMLLIElement> = (_evt: MouseEvent<HTMLLIElement>) => {
      if (typeof audio === 'string') setAudioSrc(audio);
    };
    return onClick;
  };

  return (
    <div>
      <ul>
        {[...audios].map(audio => (
          <li
            key={audio}
            onClick={getOnClick(audio)}
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
