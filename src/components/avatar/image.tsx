import React, { FC } from 'react';
import classnames from 'classnames';
import Image from '../shared/image';
import styles from './avatar.module.scss';

interface Props {
  className: string;
  imageSrc: string;
}

const Avatar: FC<Props> = (props) => {
  const { className, imageSrc, ...otherProps } = props;

  let imageTag = null;

  // setting image of avatar based on props
  if (imageSrc) {
    imageTag = <Image className={styles.image} src={imageSrc} alt="" />;
  }

  const rootClass = classnames(
    {
      [styles.avatar]: true,
      [styles.image]: imageTag !== null,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass}>
      {imageTag}
    </div>
  );
};

export default Avatar;
