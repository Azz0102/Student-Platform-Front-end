import { useEffect, useState } from "react";

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: undefined, // Initialize with current window width
        height: undefined, // Initialize with current window height
    });
    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
}
