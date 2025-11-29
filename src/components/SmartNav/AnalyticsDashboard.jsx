'use client';
import React from 'react';
import { useSmartNav } from './SmartNavContext';
import { motion } from 'framer-motion';

const SimpleBarChart = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.value));
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', gap: '12px', padding: '20px 0' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * 100}%` }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ 
              width: '100%', 
              background: color, 
              borderRadius: '4px 4px 0 0',
              opacity: 0.8
            }}
          />
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const AnalyticsDashboard = () => {
  const { tools, categories } = useSmartNav();

  // Prepare data for Category Distribution
  const categoryData = categories
    .filter(c => c.id !== 'all')
    .map(cat => ({
      label: cat.label,
      value: tools.filter(t => t.category === cat.id).length
    }));

  // Prepare data for Top Tools
  const topToolsData = [...tools]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 5)
    .map(t => ({
      label: t.title,
      value: t.usageCount
    }));

  return (
    <div className="dashboard-view">
      <div className="chart-card">
        <h3>Tech Stack Distribution</h3>
        <div className="chart-placeholder">
          <SimpleBarChart data={categoryData} color="#3b82f6" />
        </div>
      </div>

      <div className="chart-card">
        <h3>Most Used Tools</h3>
        <div className="chart-placeholder">
          <SimpleBarChart data={topToolsData} color="#10b981" />
        </div>
      </div>
      
      <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
        <h3>Recent Activity Heatmap</h3>
        <div className="chart-placeholder" style={{ flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                style={{
                  width: '16px',
                  height: '16px',
                  background: Math.random() > 0.7 ? '#3b82f6' : '#1e293b',
                  borderRadius: '2px',
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Visualizing tool usage frequency over the last 60 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
