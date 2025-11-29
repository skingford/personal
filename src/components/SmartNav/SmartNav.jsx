'use client';
import React from 'react';
import { SmartNavProvider, useSmartNav } from './SmartNavContext';
import Workbench from './Workbench';
import AnalyticsDashboard from './AnalyticsDashboard';
import CommandPalette from './CommandPalette';
import { Search, LayoutGrid, BarChart2, Command } from 'lucide-react';
import './SmartNavImproved.scss';

const SmartNavContent = () => {
  const { 
    activeView, 
    setActiveView, 
    searchQuery, 
    setSearchQuery, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    setIsCommandPaletteOpen
  } = useSmartNav();

  return (
    <div className="smart-nav-container">
      <header>
        <h1>Smart Workbench</h1>
        <div className="view-toggles">
          <button 
            className={activeView === 'workbench' ? 'active' : ''} 
            onClick={() => setActiveView('workbench')}
          >
            <LayoutGrid size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
            Workbench
          </button>
          <button 
            className={activeView === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveView('dashboard')}
          >
            <BarChart2 size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
            Dashboard
          </button>
        </div>
      </header>

      <div className="toolbar">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search tools, tags, or commands..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="cmd-k-hint">
            <Command size={12} /> K
          </div>
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={selectedCategory === cat.id ? 'active' : ''}
              onClick={() => setSelectedCategory(cat.id)}
              style={{ '--category-color': cat.color }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {activeView === 'workbench' ? <Workbench /> : <AnalyticsDashboard />}
      
      <CommandPalette />
    </div>
  );
};

const SmartNav = () => {
  return (
    <SmartNavProvider>
      <SmartNavContent />
    </SmartNavProvider>
  );
};

export default SmartNav;
