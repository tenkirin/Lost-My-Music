import { FC, useEffect, useRef, useState } from 'react';

import Uploader from '../Uploader';

import useAudioVisualization from '../../hooks/useAudioVisualization';

import { CANVAS_HEIGHT, CANVAS_WIDTH, VISUAL_CONFIG } from '../../configs/canvasConfigs';

import styles from './styles.module.scss';

import lmmSrc from '../../assets/平野綾 - Lost my music.flac';

const Player: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [audioSrc, setAudioSrc] = useState<string>(lmmSrc);

  const {
    startVisualization,
    initVisualization,
  } = useAudioVisualization(VISUAL_CONFIG);

  const onPlay = async () => {
    if (audioRef.current) {
      // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
      try {
        await audioRef.current.play();

        if (!canvasRef.current) throw new Error('canvas element not found');
        startVisualization(audioRef.current, canvasRef.current);
      } catch (err) {
        // ignore interrupted play() request error and rethrow other errors
        if (err instanceof Error && !err.message.includes('interrupted')) throw err;
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      initVisualization(canvasRef.current);
    }
  }, [initVisualization]);

  return (
    <div className={styles.player}>
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#sizing_the_canvas_using_css_versus_html */}
      <canvas id='visualizer' ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />

      <div className={styles['audio-control']}>
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

      <Uploader setAudioSrc={setAudioSrc} />
    </div>
  );
};

export default Player;
