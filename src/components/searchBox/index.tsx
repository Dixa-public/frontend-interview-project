import React, { useState, useEffect, FC } from 'react';
import useDebounce from '../../hooks/useDebounce';
import styles from './searchBox.module.scss';

interface Props {
  onChange: any;
  delay?: number;
}

const SearchBox: FC<Props> = (props) => {
  const { onChange, delay = 300, ...otherProps } = props;

  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, delay);

  /**
   * The debouncedInputValue will be only updated after the inputValue has not
   * be changed for X milliseconds. Therefore, the parent component will only
   * get a new onChange event every X milliseconds.
   */
  useEffect(() => {
    onChange(debouncedInputValue);
  }, [debouncedInputValue, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleClearInput = (): void => {
    setInputValue('');
  };

  const handleKeyDown = (e: any): void => {
    console.log('keydown: ', e);
  };

  return (
    <div className={styles.SearchBox} {...otherProps}>
      <div className={styles.InputWrapper}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
      <div className={styles.IconWrapper}>
        {inputValue !== '' ? (
          <span
            className={styles.IconClear}
            role="searchbox"
            onClick={handleClearInput}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            X
          </span>
        ) : (
          <span>S</span>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
