'use client';
import React from 'react';
import { SmartNavProvider, useSmartNav } from './SmartNavContext';
import Workbench from './Workbench';
import AnalyticsDashboard from './AnalyticsDashboard';
import CommandPalette from './CommandPalette';
import CategorySidebar from './CategorySidebar';
import { Search, LayoutGrid, BarChart2, Command, Filter } from 'lucide-react';
import './SmartNavImproved.scss';

const SmartNavContent = () => {
  const { 
    activeView, 
    setActiveView, 
    searchQuery, 
    setSearchQuery, 
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
            <LayoutGrid size={18} />
            Workbench
          </button>
          <button 
            className={activeView === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveView('dashboard')}
          >
            <BarChart2 size={18} />
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
        
        {/* Placeholder for future dropdown filter if needed */}
        {/* <button className="filter-btn"><Filter size={18} /> Filters</button> */}
      </div>

      <div className="content-wrapper">
        <div className="main-area">
          {activeView === 'workbench' ? <Workbench /> : <AnalyticsDashboard />}
        </div>
        {activeView === 'workbench' && <CategorySidebar />}
      </div>
      
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
