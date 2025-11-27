'use client';
import React from 'react';
import { useDebug } from '@/context/DebugContext';
import { Terminal, Eye } from 'lucide-react';
import './DebugToggle.scss';

const DebugToggle = () => {
  const { isDebug, toggleDebug } = useDebug();

  return (
    <button 
      className={`debug-toggle ${isDebug ? 'active' : ''}`} 
      onClick={toggleDebug}
      title={isDebug ? "Switch to Render Mode" : "Switch to Debug Mode"}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {isDebug ? <Terminal size={14} /> : <Eye size={14} />}
        </div>
      </div>
      <span className="toggle-label">{isDebug ? 'DEBUG' : 'RENDER'}</span>
    </button>
  );
};

export default DebugToggle;
