import { useState, useEffect } from "react";

/**
 * useResponsive is used to get the screen width and check if the screen is mobile, tablet, or desktop.
 * @returns screenWidth - width of the screen.
 */

export const useResponsive = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        screenWidth,
        isMobile: screenWidth <= 767,
        isTablet: screenWidth >= 768 && screenWidth <= 1023,
        isDesktop: screenWidth >= 1024,
    };
};