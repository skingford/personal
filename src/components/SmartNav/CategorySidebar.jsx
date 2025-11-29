'use client';
import React, { useState, useEffect } from 'react';
import { useSmartNav } from './SmartNavContext';
import { LayoutGrid, Code2, CheckSquare, Rocket, Server, PenTool, Bot, Box } from 'lucide-react';

const iconMap = {
  LayoutGrid, Code2, CheckSquare, Rocket, Server, PenTool, Bot
};

const CategorySidebar = () => {
  const { categories, filteredTools } = useSmartNav();
  const [activeCategory, setActiveCategory] = useState('');

  // Only show categories that have tools
  const availableCategories = categories.filter(cat => 
    cat.id !== 'all' && filteredTools.some(t => t.category === cat.id)
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = availableCategories.map(cat => document.getElementById(`category-${cat.id}`));
      
      let currentActive = '';
      // Offset for header/toolbar
      const scrollPosition = window.scrollY + 200; 

      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPosition) {
          currentActive = section.id.replace('category-', '');
        }
      });

      if (currentActive) {
        setActiveCategory(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [availableCategories]);

  const scrollToCategory = (id) => {
    const element = document.getElementById(`category-${id}`);
    if (element) {
      const offset = 120; // Adjust for sticky header/toolbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (availableCategories.length === 0) return null;

  return (
    <div className="category-sidebar">
      <div className="sidebar-title">Categories</div>
      <div className="sidebar-list">
        {availableCategories.map(cat => {
          const Icon = iconMap[cat.icon] || Box;
          return (
            <button
              key={cat.id}
              className={`sidebar-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
              style={{ '--cat-color': cat.color }}
            >
              <div className="icon-wrapper">
                <Icon size={16} />
              </div>
              <span>{cat.label}</span>
              {activeCategory === cat.id && (
                <div className="active-indicator" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
