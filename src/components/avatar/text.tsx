import React, { FC } from 'react';
import classnames from 'classnames';
import styles from './avatar.module.scss';
import { generateGradient } from '../../helpers/generateGradient';

interface Props {
  className: string;
  gradientSeed: string;
  text: string;
}
const AvatarText: FC<Props> = (props) => {
  const { className, gradientSeed, text, ...otherProps } = props;

  // `unknown type` - https://mariusschulz.com/blog/the-unknown-type-in-typescript
  const styleOverrides: Record<string, unknown> = {};
  let label = '';
  let isBackground = false;

  // setting background and label of avatar based on props
  if (gradientSeed && text) {
    label = text;
    styleOverrides.background = generateGradient(gradientSeed);
    isBackground = true;
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.background]: isBackground,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={styleOverrides}>
      {!!label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default AvatarText;
