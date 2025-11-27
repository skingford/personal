'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const DebugContext = createContext();

export const DebugProvider = ({ children }) => {
  const [isDebug, setIsDebug] = useState(false);

  const toggleDebug = () => {
    setIsDebug((prev) => !prev);
  };

  useEffect(() => {
    if (isDebug) {
      document.body.classList.add('debug-mode');
    } else {
      document.body.classList.remove('debug-mode');
    }
  }, [isDebug]);

  return (
    <DebugContext.Provider value={{ isDebug, toggleDebug }}>
      {children}
    </DebugContext.Provider>
  );
};

export const useDebug = () => useContext(DebugContext);
