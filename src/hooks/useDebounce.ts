import { useState, useEffect } from 'react';

/**
 * A very simple debounce function.
 * We could build a more verbose one or use a ready one like lodash.rebounce.
 *
 * @param value The value to be changed with a debounce effect.
 * @param delay The wait time (in milliseconds) that if passed without any further
 *              changes, it will update the value.
 */

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Sets to update the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancels the timeout (setting a new value) if the value/delay has changed
    // or if the component unmounts.
    return (): void => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
