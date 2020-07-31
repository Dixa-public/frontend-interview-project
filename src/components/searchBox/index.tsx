import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Spinner from '../spinner';
import useDebounce from '../../hooks/useDebounce';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import styles from './searchBox.module.scss';

interface Props {
  onChange: (value: string) => void;
  delay?: number;
  className?: Optional<string>;
  isLoading?: boolean;
}

const SearchBox: FC<Props> = (props) => {
  const { onChange, delay = 500, className, isLoading, ...otherProps } = props;

  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, delay);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * The debouncedInputValue will be only updated after the inputValue has not
   * be changed for X milliseconds. Therefore, the parent component will only
   * get a new onChange event every X milliseconds.
   */
  useEffect(() => {
    onChange(debouncedInputValue);
  }, [debouncedInputValue, onChange]);

  useOnClickOutside(
    containerRef,
    useCallback((): void => {
      if (!isExpanded || inputValue !== '') {
        return;
      }
      setIsExpanded(false);
    }, [isExpanded, inputValue]),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    console.log('keydown: ', e);
  };

  const handleClearIconClick = (): void => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSearchIconClick = (): void => {
    if (!isExpanded) {
      inputRef.current?.focus();
    }

    setIsExpanded(!isExpanded);
  };

  const rootClass = classnames(
    {
      [styles.SearchBox]: true,
      //   [styles.background]: isBackground,
      //   [styles.image]: imageTag !== null,
      //   [styles.avatarSmallIcon]: isSmallIcon,
    },
    className,
  );

  const IconSearchClass = classnames(
    {
      [styles.IconSearch]: true,
      [styles.IconSearchActive]: isExpanded,
    },
    className,
  );

  const InputClass = classnames(
    {
      [styles.Input]: true,
      [styles.InputExpanded]: isExpanded,
    },
    className,
  );

  return (
    <div ref={containerRef} className={rootClass} {...otherProps}>
      <div className={styles.InputWrapper}>
        <input
          ref={inputRef}
          className={InputClass}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.IconWrapper}>
        {inputValue !== '' ? (
          <>
            {isLoading ? (
              <Spinner size={20} color="white" />
            ) : (
              <span
                className={styles.IconClear}
                role="button"
                onClick={handleClearIconClick}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
              >
                <Icon name="times" className={styles.icon} />
              </span>
            )}
          </>
        ) : (
          <span
            className={IconSearchClass}
            role="button"
            onClick={handleSearchIconClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <Icon name="fa-search" className={styles.icon} />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
