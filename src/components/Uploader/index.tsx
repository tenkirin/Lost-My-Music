import { ChangeEvent, ChangeEventHandler, FC } from 'react';

import { ACCEPT_AUDIO_FORMATS } from '../../configs/audioConfigs';

import { UploaderProps } from '../../types';

const Uploader: FC<UploaderProps> = ({ setAudioSrc }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const blobUrl = URL.createObjectURL(evt.target.files[0]);
      setAudioSrc(blobUrl);
    }
  };

  return (
    <input
      type="file"
      id="uploader"
      onChange={onChange}
      accept={ACCEPT_AUDIO_FORMATS}
    />
  );
};

export default Uploader;
