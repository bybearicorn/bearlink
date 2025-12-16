import { useEffect, useState } from "react";

// Define breakpoints based on your tailwind.config.js
// IMPORTANT: Keep these in sync with your Tailwind config!
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type BreakpointKey = keyof typeof breakpoints;

// Custom hook to check if the current screen width is greater than or equal to a specific Tailwind breakpoint
export const useBreakpoint = (breakpointKey: BreakpointKey): boolean => {
  const [isMatch, setIsMatch] = useState(window.matchMedia(`(min-width: ${breakpoints[breakpointKey]}px)`).matches);

  useEffect(() => {
    const breakpointValue = breakpoints[breakpointKey];
    const mediaQuery = window.matchMedia(`(min-width: ${breakpointValue}px)`);

    // Function to update state based on query match
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => setIsMatch(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpointKey]);

  return isMatch;
};

export const useIsDesktop = (desktopBreakpointKey: BreakpointKey = "lg"): boolean => {
  return useBreakpoint(desktopBreakpointKey);
};

export const useIsMobile = (desktopBreakpointKey: BreakpointKey = "md"): boolean => {
  const isDesktopOrLarger = useBreakpoint(desktopBreakpointKey);
  return !isDesktopOrLarger;
};
