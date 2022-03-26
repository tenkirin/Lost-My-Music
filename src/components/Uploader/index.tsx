import { ChangeEvent, ChangeEventHandler, FC } from 'react';

import { ACCEPT_AUDIO_FORMATS } from '../../configs/audioConfigs';

import { AudioInfo, UploaderProps } from '../../types';

import styles from './styles.module.scss';
import parentStyles from '../Player/styles.module.scss';

const Uploader: FC<UploaderProps> = ({ addAudios }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    const audios: AudioInfo[] = [...evt.target.files ?? []].map(file => {
      // TODO: release unused object URL
      const blobUrl = URL.createObjectURL(file); // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      const lastDotIdx = file.name.lastIndexOf('.');
      const filename = file.name.slice(0, ~lastDotIdx ? lastDotIdx : file.name.length);
      return {
        name: filename,
        src: blobUrl
      };
    });
    addAudios(audios);
  };

  return (
    <label className={[styles.uploader, parentStyles.uploader].join(' ')} >
      <span>Where's your music?</span>
      <input
        type="file"
        onChange={onChange}
        accept={ACCEPT_AUDIO_FORMATS}
        multiple
      />
    </label>
  );
};

export default Uploader;
