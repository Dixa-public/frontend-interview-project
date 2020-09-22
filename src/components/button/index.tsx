import React from 'react';
import styles from './buttom.module.scss';
import classnames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css';

interface Props {
  className?: Optional<string>;
  variant: string;
  value: string;
  size: string;
  type: string;
}

const Button: React.FC<Props> = (props) => {
  const { size, value, type, variant } = props;
  const rootClass = classnames(
    [ 
        styles.input,
        size === 'small' && styles.small,
        size === 'big' && styles.big,
        variant === 'success' && styles.success,
        variant === 'info' && styles.info 
    ],
  );
  console.log(rootClass)
  return <input value={value} type={type} className={rootClass} />;
};

export default Button;
