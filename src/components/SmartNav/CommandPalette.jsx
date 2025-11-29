'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSmartNav } from './SmartNavContext';
import { Search, Command, ArrowRight } from 'lucide-react';

const CommandPalette = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    tools, 
    workflows, 
    incrementUsage, 
    runWorkflow 
  } = useSmartNav();
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredItems = [
    ...tools.map(t => ({ ...t, type: 'tool' })),
    ...workflows.map(w => ({ ...w, type: 'workflow' }))
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (item) => {
    if (item.type === 'tool') {
      window.open(item.url, '_blank');
      incrementUsage(item.id);
    } else if (item.type === 'workflow') {
      runWorkflow(item.id);
    }
    setIsCommandPaletteOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  return (
    <div className="command-palette-overlay" onClick={() => setIsCommandPaletteOpen(false)}>
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cp-input"
          placeholder="Type a command or search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="cp-results">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`cp-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="icon">
                {item.type === 'workflow' ? <Command size={18} /> : <Search size={18} />}
              </div>
              <div className="info">
                <span className="title">{item.title}</span>
                <span className="sub">{item.type === 'workflow' ? 'Workflow' : 'Tool'} • {item.description}</span>
              </div>
              <div className="shortcut">
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="cp-item" style={{ justifyContent: 'center', opacity: 0.5 }}>
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
