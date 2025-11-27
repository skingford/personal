'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useGesture } from '@use-gesture/react';
import './InfiniteCanvas.scss';

const InfiniteCanvas = ({ children }) => {
  const containerRef = useRef(null);
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 });

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setStyle((prev) => ({ ...prev, x, y }));
      },
      onWheel: ({ event, delta: [, dy] }) => {
        event.preventDefault();
        setStyle((prev) => {
          const newScale = Math.min(Math.max(0.1, prev.scale - dy * 0.001), 5);
          return { ...prev, scale: newScale };
        });
      },
    },
    {
      target: containerRef,
      drag: {
        from: () => [style.x, style.y],
        filterTaps: true,
      },
      wheel: {
        eventOptions: { passive: false },
      },
    }
  );

  return (
    <div ref={containerRef} className="infinite-canvas-container">
      <div className="grid-background" />
      <div
        className="canvas-world"
        style={{
          transform: `translate(${style.x}px, ${style.y}px) scale(${style.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default InfiniteCanvas;
