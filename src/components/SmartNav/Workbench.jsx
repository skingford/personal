'use client';
import React from 'react';
import { useSmartNav } from './SmartNavContext';
import { ExternalLink, Code, Github, Triangle, PenTool, Bot, ListTodo, FileText, Container, Box } from 'lucide-react';

const iconMap = {
  Code, Github, Triangle, PenTool, Bot, ListTodo, FileText, Container
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
          <Icon size={24} />
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
        <ExternalLink size={16} />
      </button>
    </div>
  );
};

const Workbench = () => {
  const { filteredTools, incrementUsage } = useSmartNav();

  return (
    <div className="workbench-grid">
      {filteredTools.map(tool => (
        <ToolCard 
          key={tool.id} 
          tool={tool} 
          onLaunch={incrementUsage} 
        />
      ))}
    </div>
  );
};

export default Workbench;
