import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
  const isTablet = useMediaQuery({ maxWidth: 900 });
  const isDesktop = useMediaQuery({ maxWidth: 1200 });
  const isMobile = useMediaQuery({maxWidth: 600})

  return {
    isTablet,
    isDesktop,
    isMobile
  };
};
