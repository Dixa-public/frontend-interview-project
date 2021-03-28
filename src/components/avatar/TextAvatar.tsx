import classnames from 'classnames';
import React, { FC } from 'react';
import styles from './avatar.module.scss';
import {
  AvatarState,
  useAvatarContext,
  useBackground,
  useContent,
  useGetAvatarState,
} from './hooks';

const TextAvatar: FC = () => {
  const { className, text, ...rest } = useAvatarContext();
  const avatarState = useGetAvatarState();
  const background = useBackground();
  const content = useContent();
  if (avatarState !== AvatarState.TEXT) return null;
  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: true,
    },
    className,
  );

  return (
    <div {...rest} className={rootClass} style={{ background }}>
      <span className={styles.text}>{content}</span>
    </div>
  );
};
export default TextAvatar;
