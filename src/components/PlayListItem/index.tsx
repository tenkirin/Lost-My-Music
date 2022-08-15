import { FC, PropsWithChildren } from 'react';

import { cls } from '../../utils/misc';

import { PlayListItemProps } from '../../types';

import styles from './styles.module.scss';

const PlayListItem: FC<PropsWithChildren<PlayListItemProps>> = ({
  onClick,
  className,
  children,
}) => (
  <li
    onClick={onClick}
    className={cls(styles['playlist-item'], className)}
  >
    {children}
  </li>
);

export default PlayListItem;
