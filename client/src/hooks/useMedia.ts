import { useMediaQuery } from 'react-responsive';

export const useMedia = () => {
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return {
    isTablet,
    isDesktop,
    isMobile,
  };
};
