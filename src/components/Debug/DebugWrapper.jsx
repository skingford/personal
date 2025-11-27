'use client';
import React from 'react';
import { useDebug } from '@/context/DebugContext';
import './DebugWrapper.scss';

const DebugWrapper = ({ children, data, className = '', tag = 'div' }) => {
  const { isDebug } = useDebug();

  if (!isDebug) {
    return children;
  }

  return (
    <div className={`debug-wrapper ${className}`}>
      <div className="debug-tag-start">&lt;{tag} class="{className}"&gt;</div>
      <div className="debug-content">
        {data ? (
          <pre className="json-display">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          children
        )}
      </div>
      <div className="debug-tag-end">&lt;/{tag}&gt;</div>
    </div>
  );
};

export default DebugWrapper;
