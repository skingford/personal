import React from 'react';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';

export const metadata = {
  title: 'Algorithm Jukebox | My Portfolio',
  description: 'Interactive music generator powered by algorithms.',
};

export default function JukeboxPage() {
  return (
    <div className="jukebox-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0f172a', /* Slate 900 */
      padding: '2rem'
    }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#7aa2f7',
          marginBottom: '1rem',
          fontFamily: "'Fira Code', monospace"
        }}>
          Algorithm Jukebox
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px' }}>
          Code your own beats. Click the grid to toggle steps. 
          Use the presets to explore different algorithms.
        </p>
      </div>
      
      {/* 
        We render the MusicPlayer here. 
        Since it has fixed positioning by default, we might want to override it 
        or just let it float. But for a dedicated page, centering it is better.
        The current CSS uses .algo-jukebox { position: fixed ... }
        We can override this by passing a style or wrapping it if it accepts props.
        Currently MusicPlayer doesn't accept style/className props in the simplified version I wrote.
        
        Let's just render it for now. The user might want it to be the main focus.
        If I want to center it, I need to modify MusicPlayer to support non-fixed mode.
      */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '600px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <MusicPlayer className="static-mode" />
      </div>
    </div>
  );
}
