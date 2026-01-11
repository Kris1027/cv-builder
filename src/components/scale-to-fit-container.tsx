import { type ReactNode, useEffect } from 'react';
import { useScaleToFit, A4_HEIGHT_PX } from '@/hooks/use-scale-to-fit';

interface ScaleToFitContainerProps {
  enabled: boolean;
  children: ReactNode;
  className?: string;
  onScaleChange?: (scale: number, isScaled: boolean, atMinScale: boolean) => void;
}

export function ScaleToFitContainer({
  enabled,
  children,
  className,
  onScaleChange,
}: ScaleToFitContainerProps) {
  const { contentRef, scale, isScaled, atMinScale, recalculate } = useScaleToFit({
    enabled,
    minScale: 0.5,
  });

  // Recalculate after children change
  useEffect(() => {
    const timer = setTimeout(() => {
      recalculate();
    }, 100);
    return () => clearTimeout(timer);
  }, [children, recalculate]);

  // Notify parent of scale changes
  useEffect(() => {
    onScaleChange?.(scale, isScaled, atMinScale);
  }, [scale, isScaled, atMinScale, onScaleChange]);

  const containerStyle: React.CSSProperties = enabled
    ? {
        height: `${A4_HEIGHT_PX}px`,
        overflow: 'hidden',
        position: 'relative',
      }
    : {};

  const contentStyle: React.CSSProperties = enabled
    ? {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100 / scale}%`,
      }
    : {};

  return (
    <div className={className} style={containerStyle}>
      <div ref={contentRef} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
