import { useState, useEffect, useCallback } from 'react';

export const useOutsideClick = (element: { current: HTMLElement | null }) => {
  const [isVisible, setIsVisible] = useState<true | false>(false);

  const handleClick = useCallback(
    (evt: MouseEvent) => {
      if (element?.current && !element?.current?.contains(evt.target as Node)) {
        setIsVisible(false);
      }
    },
    [element],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return {
    isVisible,
    setIsVisible,
  };
};
