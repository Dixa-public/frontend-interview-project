import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './image.module.scss';

interface Props {
  src: Src;
  className?: string;
  alt?: string;
}

interface State {
  src: string | undefined;
  isLoadingError: boolean;
  isLoadingComplete: boolean;
}

const initialState: State = {
  src: undefined,
  isLoadingError: false,
  isLoadingComplete: false,
};

const Image: FC<Props> = (props) => {
  const { className, src, alt, ...otherProps } = props;
  const [state, setState] = useState<State>(initialState);

  const handleSource = async (source: Src): Promise<void> => {
    if (typeof source === 'string') {
      setState((s) => ({ ...s, src: source }));
      return;
    }

    try {
      const result = await source();
      setState((s) => ({ ...s, src: result }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[Image] handleSource', e);
      setState((s) => ({ ...s, isLoadingError: true }));
    }
  };

  const handleLoad = (): void => {
    setState((s) => ({ ...s, isLoadingComplete: true, isLoadingError: false }));
  };

  const handleError = (): void => {
    setState((s) => ({ ...s, isLoadingComplete: false, isLoadingError: true }));
  };

  useEffect(() => {
    handleSource(src);
  }, [src]);

  const rootClass = classnames(
    {
      [styles.image]: true,
      [styles.error]: state.isLoadingError,
      [styles.complete]: state.isLoadingComplete,
    },
    className,
  );

  return (
    <img
      {...otherProps}
      className={rootClass}
      onError={handleError}
      onLoad={handleLoad}
      src={state.src}
      alt={alt}
    />
  );
};

export default Image;
