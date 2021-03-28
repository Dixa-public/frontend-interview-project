import classnames from 'classnames';
import React, { FC } from 'react';
import Image from '../image';
import styles from './avatar.module.scss';
import {
  AvatarState,
  useAvatarContext,
  useContent,
  useGetAvatarState,
} from './hooks';

const ImageAvatar: FC = () => {
  const { className, user, alt, ...rest } = useAvatarContext();
  const avatarState = useGetAvatarState();
  const content = useContent();
  if (avatarState !== AvatarState.IMAGE) return null;
  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: true,
      [styles.image]: true,
    },
    className,
  );

  return (
    <div {...rest} className={rootClass}>
      <Image
        className={styles.image}
        src={content}
        alt={alt || user?.name || undefined}
      />
    </div>
  );
};

export default ImageAvatar;
