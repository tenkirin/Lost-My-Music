import { FC, useEffect, useRef } from 'react';

import useAudioVisualization from '../../hooks/useAudioVisualization';

import { PlayerProps } from '../../types';

import { CANVAS_HEIGHT, CANVAS_WIDTH, VISUAL_CONFIG } from '../../configs/canvasConfigs';

import styles from './styles.module.scss';

const Player: FC<PlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { visualize, drawCanvas } = useAudioVisualization();

  const onPlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();

      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream#firefox-specific_notes
      // https://stackoverflow.com/a/68044674
      // https://stackoverflow.com/a/48623627
      const stream = (audioRef.current as any).captureStream?.() ?? (audioRef.current as any).mozCaptureStream?.();
      if (!canvasRef.current) throw new Error('canvas element not found');
      visualize(stream, canvasRef.current, VISUAL_CONFIG);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawCanvas(canvasRef.current, new Uint8Array(VISUAL_CONFIG.barCount).fill(0));
    }
  }, [drawCanvas]);

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
    </div>
  );
};

export default Player;
