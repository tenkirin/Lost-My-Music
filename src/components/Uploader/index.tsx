import { ChangeEvent, ChangeEventHandler, FC } from 'react';

import { ACCEPT_AUDIO_FORMATS } from '../../configs/audioConfigs';

import { UploaderProps } from '../../types';

import styles from './styles.module.scss';

const Uploader: FC<UploaderProps> = ({ setAudioSrc, addAudios }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const blobUrl = URL.createObjectURL(evt.target.files[0]);
      setAudioSrc(blobUrl);
      addAudios(blobUrl);
    }
  };

  return (
    <label className={styles.uploader} >
      <span>Where's your music?</span>
      <input
        type="file"
        onChange={onChange}
        accept={ACCEPT_AUDIO_FORMATS}
      />
    </label>
  );
};

export default Uploader;
