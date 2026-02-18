import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { MotionValue } from 'motion/react';

type UseParallaxOptions = {
    yRange?: number;
    opacityRange?: [number, number];
};

type UseParallaxReturn<T extends HTMLElement> = {
    ref: React.RefObject<T | null>;
    y: MotionValue<number> | number;
    opacity: MotionValue<number> | number;
};

export const useParallax = <T extends HTMLElement = HTMLDivElement>({
    yRange = 20,
    opacityRange,
}: UseParallaxOptions = {}): UseParallaxReturn<T> => {
    const ref = useRef<T>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);
    const opacity = useTransform(scrollYProgress, [0, 1], opacityRange ?? [1, 1]);

    if (shouldReduceMotion) {
        return { ref, y: 0, opacity: 1 };
    }

    return { ref, y, opacity };
};
