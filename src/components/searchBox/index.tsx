import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Spinner from '../spinner';
import useDebounce from '../../hooks/useDebounce';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import styles from './searchBox.module.scss';

interface Props {
  className?: string;
  delay?: number;
  isLoading?: boolean;
  onChange: (value: string) => void;
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

  const toggleSearchBox = (): void => {
    if (inputValue === '') {
      if (!isExpanded) {
        inputRef.current?.focus();
      }

      setIsExpanded(!isExpanded);
    }
  };

  useOnClickOutside(
    containerRef,
    useCallback((): void => {
      toggleSearchBox();
    }, [isExpanded, inputValue]),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (e.keyCode === 13) {
      toggleSearchBox();
    }
  };

  const handleClearIconClick = (): void => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSearchIconClick = (): void => {
    toggleSearchBox();
  };

  const rootClass = classnames(
    {
      [styles.SearchBox]: true,
      [styles.SearchBoxExpanded]: isExpanded,
    },
    className,
  );

  return (
    <div ref={containerRef} className={rootClass} {...otherProps}>
      <div className={styles.InputWrapper}>
        <input
          ref={inputRef}
          className={styles.Input}
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
            className={styles.IconSearch}
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
