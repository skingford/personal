import React from 'react';
import InfiniteCanvas from '@/components/InfiniteCanvas/InfiniteCanvas';
import World from '@/components/InfiniteCanvas/World';

export const metadata = {
  title: 'Home | My Portfolio',
  description: 'Welcome to my personal portfolio website.',
};

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <InfiniteCanvas>
        <World />
      </InfiniteCanvas>
      
      {/* Overlay UI Hints */}
      <div style={{ 
        position: 'fixed', 
        bottom: 30, 
        left: '50%', 
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.5)', 
        pointerEvents: 'none', 
        zIndex: 100,
        fontSize: '0.9rem',
        background: 'rgba(0,0,0,0.5)',
        padding: '8px 16px',
        borderRadius: '20px',
        backdropFilter: 'blur(5px)'
      }}>
        Scroll to Zoom • Drag to Pan
      </div>
    </div>
  );
}
