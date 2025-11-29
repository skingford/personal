'use client';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_TOOLS, CATEGORIES, WORKFLOWS } from './data';

const SmartNavContext = createContext();

export const SmartNavProvider = ({ children }) => {
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [activeView, setActiveView] = useState('workbench'); // workbench, dashboard
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Filter tools based on search only
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [tools, searchQuery]);

  // Sort tools by usage count (descending)
  const sortedTools = useMemo(() => {
    return [...filteredTools].sort((a, b) => b.usageCount - a.usageCount);
  }, [filteredTools]);

  const incrementUsage = (id) => {
    setTools(prev => prev.map(tool => 
      tool.id === id 
        ? { ...tool, usageCount: tool.usageCount + 1, lastUsed: new Date().toISOString() } 
        : tool
    ));
  };

  const executeCommand = (command) => {
    console.log('Executing command:', command);
    // In a real app, this would handle 'open:url', 'cmd:script', etc.
    if (command.startsWith('open:')) {
      const toolId = command.split(':')[1];
      const tool = tools.find(t => t.id === toolId);
      if (tool) {
        window.open(tool.url, '_blank');
        incrementUsage(tool.id);
      }
    }
  };

  const runWorkflow = (workflowId) => {
    const workflow = WORKFLOWS.find(w => w.id === workflowId);
    if (workflow) {
      console.log(`Running workflow: ${workflow.title}`);
      workflow.actions.forEach(action => executeCommand(action));
    }
  };

  return (
    <SmartNavContext.Provider value={{
      tools,
      filteredTools: sortedTools,
      categories: CATEGORIES,
      workflows: WORKFLOWS,
      activeView,
      setActiveView,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      incrementUsage,
      runWorkflow
    }}>
      {children}
    </SmartNavContext.Provider>
  );
};

export const useSmartNav = () => useContext(SmartNavContext);
