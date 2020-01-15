import React, { FC } from 'react';
import classnames from 'classnames';

import styles from './spinner.module.scss';

interface Props {
  className?: Optional<string>;
  size?: number;
  color?: string;
}

const Spinner: FC<Props> = (props) => {
  const { className, size, color, ...otherProps } = props;

  const rootClass = classnames(
    {
      [styles.root]: true,
    },
    className,
  );

  const hwValue = typeof size === 'number' ? size : 32;
  const hwPixelValue = typeof size === 'number' ? `${hwValue}px` : '32px';
  const borderSizePixelValue = `${Math.max(Math.floor(hwValue / 10), 1)}px`;
  const style: Record<string, unknown> = {
    height: hwPixelValue,
    width: hwPixelValue,
    borderWidth: borderSizePixelValue,
    borderTopColor: undefined,
  };

  if (color && color.length) {
    style.borderTopColor = color;
  }

  return <div {...otherProps} style={style} className={rootClass} />;
};

export default Spinner;
