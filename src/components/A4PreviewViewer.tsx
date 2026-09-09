import React, { useRef, useState, useEffect } from 'react';
import { CoverPageFormData } from '../types';
import { A4CoverPage } from './A4CoverPage';

interface A4PreviewViewerProps {
  data: CoverPageFormData;
}

const CANONICAL_WIDTH = 794;
const CANONICAL_HEIGHT = 1123;

export const A4PreviewViewer: React.FC<A4PreviewViewerProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth - 24; // padding allowance
      if (availableWidth > 0) {
        // Scale down to fit mobile/tablet/desktop containers
        const computedScale = Math.min(availableWidth / CANONICAL_WIDTH, 0.75);
        setScale(Math.max(computedScale, 0.3));
      }
    };

    updateScale();

    // Use ResizeObserver for instant responsive resize tracking
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(updateScale);
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const scaledWidth = Math.round(CANONICAL_WIDTH * scale);
  const scaledHeight = Math.round(CANONICAL_HEIGHT * scale);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-start overflow-hidden py-1"
    >
      <div
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="shadow-2xl rounded-sm border border-slate-300/60 bg-white"
      >
        <div
          style={{
            width: `${CANONICAL_WIDTH}px`,
            height: `${CANONICAL_HEIGHT}px`,
            transform: `scale(${scale}) translateZ(0)`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            willChange: 'transform',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <A4CoverPage data={data} id="preview-cover-stage" />
        </div>
      </div>
    </div>
  );
};
