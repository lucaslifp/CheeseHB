import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 1024; // lg breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Check on initial load
    checkDevice();

    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return isMobile;
}
