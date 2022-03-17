import { FC, useRef } from 'react';
import useAudioVisualization from '../../hooks/useAudioVisualization';

type PlayerProps = {
  audioSrc: string;
};

const Player: FC<PlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { visualize } = useAudioVisualization('#canvas');

  const onPlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();

      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream
      const stream = (audioRef.current as any).captureStream(); // https://stackoverflow.com/a/68044674
      visualize(stream);
    }
  };

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
