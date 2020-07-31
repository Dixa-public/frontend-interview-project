import { useEffect } from 'react';

/**
 * Shamelessly taken from https://usehooks.com/useOnClickOutside/
 *
 * @param ref The component for which to listen on outside clicks
 * @param handler Callback to execute when an outslide click occurs.
 */
const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
): void => {
  useEffect(() => {
    const listener = (event: any): void => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
