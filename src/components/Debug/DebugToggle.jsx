'use client';
import React from 'react';
import { useDebug } from '@/context/DebugContext';
import { Terminal, Bug } from 'lucide-react';
import './DebugToggle.scss';

const DebugToggle = () => {
  const { isDebug, toggleDebug } = useDebug();

  return (
    <button 
      className={`debug-toggle ${isDebug ? 'active' : ''}`} 
      onClick={toggleDebug}
      title={isDebug ? "Disable Debug Mode" : "Enable Debug Mode"}
      aria-pressed={isDebug}
    >
      <div className="icon-wrapper">
        {isDebug ? <Terminal size={14} /> : <Bug size={14} />}
      </div>
      <span className="toggle-label">{isDebug ? 'DEBUG ON' : 'DEBUG OFF'}</span>
    </button>
  );
};

export default DebugToggle;
