import classnames from 'classnames';
import React, { FC } from 'react';
import Icon from '../icon';
import styles from './avatar.module.scss';
import {
  AvatarState,
  useAvatarContext,
  useBackground,
  useContent,
  useGetAvatarState,
} from './hooks';

const IconAvatar: FC = () => {
  const {
    iconKey,
    className,
    isSmallIcon,
    user,
    ...otherProps
  } = useAvatarContext();
  const background = useBackground();
  const currentState = useGetAvatarState();
  const content = useContent();
  if (currentState !== AvatarState.ICON) return null;
  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: true,
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={{ background }}>
      <Icon name={content} className={styles.icon} />
    </div>
  );
};

export default IconAvatar;
