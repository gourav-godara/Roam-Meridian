import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";

/**
 * RouteLoader
 * Watches the router location and briefly shows PageLoader whenever
 * the pathname changes — giving every page in the app a consistent
 * transition animation without wrapping each page individually.
 *
 * Drop this in AppRouter.jsx, inside <BrowserRouter>, alongside
 * <ScrollToTop />:
 *
 *   <BrowserRouter>
 *     <ScrollToTop />
 *     <RouteLoader />
 *     <Routes>...</Routes>
 *   </BrowserRouter>
 *
 * MIN_VISIBLE_MS keeps the animation from flashing on instant
 * navigations (so it always reads as an intentional transition,
 * not a glitch), while still resolving quickly on fast loads.
 */
const MIN_VISIBLE_MS = 550;

function RouteLoader() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Skip the very first mount — the initial app boot is handled
    // separately by the splash screen in index.html / main.jsx.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVisible(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, MIN_VISIBLE_MS);

    return () => clearTimeout(timeoutRef.current);
    // navigationType included so POP (back/forward) also retriggers
  }, [pathname, navigationType]);

  return <PageLoader visible={visible} />;
}

export default RouteLoader;