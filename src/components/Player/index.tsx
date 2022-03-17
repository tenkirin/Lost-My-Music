import { FC, useRef } from 'react';

type PlayerProps = {
  audioSrc: string;
};

const Player: FC<PlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlay = () => audioRef?.current?.play();

  return (
    <div>
      {/* https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement */}
      {/* https://stackoverflow.com/a/69167223 */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onPlay={onPlay}
        controls
        controlsList="nodownload noplaybackrate"
      />
    </div>
  );
};

export default Player;
