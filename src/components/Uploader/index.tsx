import { ChangeEvent, ChangeEventHandler, FC } from 'react';

import { ACCEPT_AUDIO_FORMATS } from '../../configs/audioConfigs';

import { UploaderProps } from '../../types';

import styles from './styles.module.scss';
import parentStyles from '../Player/styles.module.scss';

const Uploader: FC<UploaderProps> = ({ addAudios }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.length) { // https://stackoverflow.com/a/66985035
      const [file] = evt.target.files;
      // TODO: release unused object URL
      const blobUrl = URL.createObjectURL(file); // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      addAudios(blobUrl);
    }
  };

  return (
    <label className={[styles.uploader, parentStyles.uploader].join(' ')} >
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
