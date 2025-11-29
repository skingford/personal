'use client';
import React from 'react';
import { useSmartNav } from './SmartNavContext';
import { 
  ExternalLink, Code, Github, Triangle, PenTool, Bot, ListTodo, FileText, Container, Box,
  LayoutGrid, Code2, CheckSquare, Rocket, Server
} from 'lucide-react';

const iconMap = {
  Code, Github, Triangle, PenTool, Bot, ListTodo, FileText, Container,
  LayoutGrid, Code2, CheckSquare, Rocket, Server
};

const ToolCard = ({ tool, onLaunch }) => {
  const Icon = iconMap[tool.icon] || Box;
  
  const statusClass = tool.status === 'update_available' ? 'update' : 
                      tool.status === 'warning' ? 'warning' : 
                      tool.status === 'error' ? 'error' : 'healthy';

  return (
    <div className="tool-card" onClick={() => onLaunch(tool.id)}>
      <div className="card-header">
        <div className="icon-box">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <div className={`status-dot ${statusClass}`} title={`Status: ${tool.status}`} />
      </div>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
      <div className="card-footer">
        <div className="tags">
          {tool.tags.slice(0, 2).map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <span className="usage">{tool.usageCount} uses</span>
      </div>
      <button className="launch-btn" onClick={(e) => {
        e.stopPropagation();
        window.open(tool.url, '_blank');
        onLaunch(tool.id);
      }}>
        <ExternalLink size={18} />
      </button>
    </div>
  );
};

const Workbench = () => {
  const { filteredTools, categories, incrementUsage } = useSmartNav();

  // Group tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  // Get categories to display (excluding 'all' unless we want to show it specially, but usually we group by specific cats)
  // We filter categories that have at least one tool in the current filtered set
  const displayCategories = categories.filter(cat => 
    cat.id !== 'all' && groupedTools[cat.id]?.length > 0
  );

  return (
    <div className="workbench-container">
      {displayCategories.map(cat => {
        const CatIcon = iconMap[cat.icon] || LayoutGrid;
        
        return (
          <div key={cat.id} id={`category-${cat.id}`} className="category-section">
            <div className="category-header">
              <div className="cat-icon" style={{ color: cat.color, background: `${cat.color}15` }}>
                <CatIcon size={20} />
              </div>
              <h2 style={{ '--cat-color': cat.color }}>{cat.label}</h2>
              <div className="line" />
            </div>
            <div className="workbench-grid">
              {groupedTools[cat.id].map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onLaunch={incrementUsage} 
                />
              ))}
            </div>
          </div>
        );
      })}
      
      {displayCategories.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <p>No tools found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Workbench;
