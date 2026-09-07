import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../../animations/smoothScroll';

/**
 * Ensures any route change (e.g. entering a product details page)
 * immediately positions the view at the top of the page.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset immediately on path transition
    scrollToTop(true);
  }, [pathname]);

  return null;
};
