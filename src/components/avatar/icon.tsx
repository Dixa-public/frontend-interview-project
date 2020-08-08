import React, { FC } from 'react';
import classnames from 'classnames';
import Icon from '../shared/icon';
import styles from './avatar.module.scss';

interface Props {
  className?: string;
  color: string;
  iconKey: string;
  isSolid?: boolean;
  isSmallIcon?: boolean;
}

const AvatarIcon: FC<Props> = (props) => {
  const { className, color, iconKey, isSolid, isSmallIcon, ...otherProps } = props;

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let isBackground = false;

  // setting background of avatar based on props
  if (color) {
    styleOverrides.backgroundColor = color;
    isBackground = true;
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: isBackground,
      [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {!!iconKey && <Icon name={iconKey} isSolid={isSolid} className={styles.icon} />}
    </div>
  );
};

export default AvatarIcon;
