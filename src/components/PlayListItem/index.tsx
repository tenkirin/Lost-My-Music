import { FC, useEffect, useRef, useState } from 'react';

import { cls } from '../../utils/misc';

import { PlayListItemProps } from '../../types';

import styles from './styles.module.scss';

const PlayListItem: FC<PlayListItemProps> = ({
  content,
  onClick,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [animationDuration, setAnimationDuration] = useState('5s');

  useEffect(() => {
    const { current: container } = containerRef;
    if (!container) return;

    setIsOverflowed(container.clientWidth < container.scrollWidth);
    setAnimationDuration(`${container.scrollWidth / (14 * 3)}s`); // 3chars/s, font-size: 14px;
  }, []);

  return (
    <li
      onClick={onClick}
      className={cls(
        styles['playlist-item'],
        isOverflowed && 'overflowed',
        className,
      )}
    >
      <div ref={containerRef} className={styles['container']}>
        <span
          data-content={content}
          className={styles['content']}
          style={{ animationDuration }}
        >
          {content}
        </span>
      </div>
    </li >
  );
};

export default PlayListItem;
