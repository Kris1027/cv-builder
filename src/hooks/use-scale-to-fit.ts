import { useState, useEffect, useRef, useCallback } from 'react';

// A4 dimensions
const A4_HEIGHT_MM = 297;
const MM_TO_PX = 96 / 25.4; // 96 DPI standard
const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX; // ~1123px

interface UseScaleToFitOptions {
    enabled: boolean;
    minScale?: number;
}

interface UseScaleToFitReturn {
    contentRef: React.RefObject<HTMLDivElement | null>;
    scale: number;
    isScaled: boolean;
    atMinScale: boolean;
    recalculate: () => void;
}

export function useScaleToFit(options: UseScaleToFitOptions): UseScaleToFitReturn {
    const { enabled, minScale = 0.5 } = options;
    const contentRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [isScaled, setIsScaled] = useState(false);
    const [atMinScale, setAtMinScale] = useState(false);

    const recalculate = useCallback(() => {
        if (!enabled || !contentRef.current) {
            setScale(1);
            setIsScaled(false);
            setAtMinScale(false);
            return;
        }

        // Temporarily reset scale to measure true content height
        const currentTransform = contentRef.current.style.transform;
        const currentWidth = contentRef.current.style.width;
        contentRef.current.style.transform = 'none';
        contentRef.current.style.width = '';

        const contentHeight = contentRef.current.scrollHeight;

        // Restore previous transform
        contentRef.current.style.transform = currentTransform;
        contentRef.current.style.width = currentWidth;

        if (contentHeight > A4_HEIGHT_PX) {
            const calculatedScale = Math.max(minScale, A4_HEIGHT_PX / contentHeight);
            setScale(calculatedScale);
            setIsScaled(true);
            setAtMinScale(calculatedScale === minScale);
        } else {
            setScale(1);
            setIsScaled(false);
            setAtMinScale(false);
        }
    }, [enabled, minScale]);

    useEffect(() => {
        // Wait for fonts to load before measuring
        document.fonts.ready.then(() => {
            // Small delay to ensure layout is complete
            requestAnimationFrame(() => {
                recalculate();
            });
        });

        // Recalculate on window resize
        const handleResize = () => {
            recalculate();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [recalculate]);

    // Recalculate when enabled changes
    useEffect(() => {
        recalculate();
    }, [enabled, recalculate]);

    return { contentRef, scale, isScaled, atMinScale, recalculate };
}

export { A4_HEIGHT_PX };
