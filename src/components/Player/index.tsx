import { FC, useCallback, useEffect, useRef, useState } from 'react';

import PlayList from '../PlayList';

import useAudioVisualization from '../../hooks/useAudioVisualization';

import { CANVAS_HEIGHT, CANVAS_WIDTH, VISUAL_CONFIG } from '../../configs/canvasConfigs';
import { PRESET_AUDIOS } from '../../configs/audioConfigs';

import styles from './styles.module.scss';

import { AudioInfo } from '../../types';


const Player: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentAudio, setCurrentAudio] = useState<AudioInfo>(PRESET_AUDIOS[0]);
  const [currentTime, setCurrentTime] = useState<string>('00:00');

  const {
    startVisualization,
    initVisualization,
  } = useAudioVisualization(VISUAL_CONFIG);

  const onPlay = useCallback(async () => {
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
  }, [startVisualization]);

  useEffect(() => {
    if (canvasRef.current) {
      initVisualization(canvasRef.current);
    }
  }, [initVisualization]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime; // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
        const toPaddedStr: (n: number) => string = time => String(time).padStart(2, '0'); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        const minute = toPaddedStr(Math.trunc(currentTime / 60));
        const second = toPaddedStr(Math.trunc(currentTime % 60));
        setCurrentTime(`${minute}:${second}`);
      }
    }, 500); // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className={styles.player}>
      <main className={styles['player-main']}>
        <h2>
          <span className={styles['current-name']}>{currentAudio.name}</span>
          <span className={styles['current-time']}>{currentTime}</span>
        </h2>

        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#sizing_the_canvas_using_css_versus_html */}
        <canvas id='visualizer' ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />

        <div className={styles['audio-control']}>
          {/* https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement */}
          {/* https://stackoverflow.com/a/69167223 */}
          <audio
            ref={audioRef}
            src={currentAudio.src}
            onPlay={onPlay}
            controls
            controlsList="nodownload noplaybackrate"
          />
        </div>
      </main>

      <PlayList setCurrentAudio={setCurrentAudio} currentAudio={currentAudio} />
    </div>
  );
};

export default Player;
