import React, { FC } from 'react';
import classnames from 'classnames';
import Icon from './icon';
import Image from './image';
import styles from './avatar.module.scss';

interface Props {
  className?: string;
  color?: string;
  imageSrc?: string;
  iconKey?: string;
  isSolid?: boolean;
  isSmallIcon?: boolean;
}

const Avatar: FC<Props> = (props) => {
  const { className, color, imageSrc, iconKey, isSolid, isSmallIcon, ...otherProps } = props;

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let imageTag = null;
  let isBackground = false;

  // setting backgrounds of avatar based on different props
  if (color) {
    styleOverrides.backgroundColor = color;
    isBackground = true;
  } else if (imageSrc) {
    imageTag = <Image className={styles.image} src={imageSrc} alt="" />;
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: isBackground,
      [styles.image]: imageTag !== null,
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {imageTag}
      {!!iconKey && <Icon name={iconKey} isSolid={isSolid} className={styles.icon} />}
    </div>
  );
};

export default Avatar;
