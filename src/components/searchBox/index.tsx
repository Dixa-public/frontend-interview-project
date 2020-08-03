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

interface State {
  inputValue: string;
  isExpanded: boolean;
}

const initialState: State = {
  inputValue: '',
  isExpanded: false,
};

const SearchBox: FC<Props> = (props) => {
  const { onChange, delay = 500, className, isLoading, ...otherProps } = props;

  const [state, setState] = useState<State>(initialState);
  const debouncedInputValue = useDebounce(state.inputValue, delay);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * The debouncedInputValue will only be updated after the inputValue hasn't
   * be changed for X milliseconds. Therefore, the parent component will only
   * receive a new onChange event every X milliseconds.
   */
  useEffect(() => {
    onChange(debouncedInputValue);
  }, [debouncedInputValue, onChange]);

  /**
   * Expands and focuses on a "closed" SearchBox or
   * closes an expanded one if it holds no value.
   */
  const toggleSearchBox = useCallback(
    (toggleState: boolean): void => {
      if (state.inputValue === '') {
        if (toggleState === true) {
          inputRef.current?.focus();
        }

        setState((prevState) => ({
          ...prevState,
          isExpanded: toggleState,
        }));
      }
    },
    [state.inputValue],
  );

  /**
   * Listens to clicks outside the SearchBox components
   * and toggles its "expand" state.
   */
  useOnClickOutside(containerRef, () => toggleSearchBox(false));

  /**
   * HANDLERS for DOM user actions
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, inputValue: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (e.keyCode === 13) {
      toggleSearchBox(!state.isExpanded);
    }
  };

  const handleClearIconClick = (): void => {
    setState((prevState) => ({
      ...prevState,
      inputValue: '',
    }));
    inputRef.current?.focus();
  };

  const handleSearchIconClick = (): void => {
    toggleSearchBox(!state.isExpanded);
  };

  const rootClass = classnames(
    {
      [styles.SearchBox]: true,
      [styles.SearchBoxExpanded]: state.isExpanded,
    },
    className,
  );

  const renderedInput = (
    <input
      ref={inputRef}
      className={styles.Input}
      type="text"
      value={state.inputValue}
      onChange={handleInputChange}
    />
  );

  let renderedIcon = null;
  if (state.inputValue !== '') {
    if (isLoading) {
      renderedIcon = <Spinner size={20} color="white" />;
    } else {
      renderedIcon = (
        <span
          className={styles.IconClear}
          role="button"
          onClick={handleClearIconClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <Icon name="times" />
        </span>
      );
    }
  } else {
    renderedIcon = (
      <span
        className={styles.IconSearch}
        role="button"
        onClick={handleSearchIconClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <Icon name="fa-search" />
      </span>
    );
  }

  return (
    <div ref={containerRef} className={rootClass} {...otherProps}>
      <div className={styles.Content}>
        <div className={styles.InputWrapper}>{renderedInput}</div>
        <div className={styles.IconWrapper}>{renderedIcon}</div>
      </div>
    </div>
  );
};

export default SearchBox;
