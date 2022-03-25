import { FC, MouseEvent, useState } from 'react';

import Uploader from '../Uploader';

import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import { EventHanlderWithBoundArgs, PlayListProps } from '../../types';

const PlayList: FC<PlayListProps> = ({ setAudioSrc }) => {
  // TODO: use Set & MD5 to eliminate duplication
  const [audios, setAudios] = useState<string[]>(PRESET_AUDIOS);

  const addAudios = (newAudio: string) => {
    setAudios([newAudio, ...audios]);
  };

  const onClick: EventHanlderWithBoundArgs<MouseEvent<HTMLLIElement>> = (
    boundArgs: unknown[], _evt: MouseEvent<HTMLLIElement>
  ) => {
    const [audio] = boundArgs;
    if (typeof audio === 'string') setAudioSrc(audio);
  };

  return (
    <div>
      <ul>
        {[...audios].map(audio => (
          <li
            key={audio}
            onClick={onClick.bind(null, [audio])}
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
