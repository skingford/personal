'use client';
import React, { useState, useEffect } from 'react';
import { Activity, Users, GitCommit, Coffee, Code, Cpu, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.scss';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState({
    cpu: 12,
    cpuCores: 8,
    cpuFreq: 2.4,
    memory: 45,
    memoryUsed: 3.6,
    memoryTotal: 8,
    visitors: 1,
    status: 'coding' // 'coding' | 'coffee'
  });
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate real-time server stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newCpu = Math.max(5, Math.min(90, prev.cpu + (Math.random() * 10 - 5)));
        const newCpuFreq = 2.4 + (newCpu / 100) * 1.6; // 2.4GHz base, up to 4.0GHz turbo
        const newMemory = Math.max(20, Math.min(80, prev.memory + (Math.random() * 5 - 2.5)));
        const newMemoryUsed = (newMemory / 100) * prev.memoryTotal;
        
        return {
          ...prev,
          cpu: newCpu,
          cpuFreq: newCpuFreq,
          memory: newMemory,
          memoryUsed: newMemoryUsed,
          visitors: Math.max(1, Math.floor(prev.visitors + (Math.random() * 3 - 1.5)))
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Fetch GitHub activity
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // Using a public repo or user for demo. 
        // Ideally this would be the user's actual GitHub username.
        // Fallback to a popular repo if user not found to ensure data shows.
        const response = await fetch('https://api.github.com/users/SteveKingFord/events/public?per_page=3');
        if (response.ok) {
          const data = await response.json();
          const pushEvents = data.filter(e => e.type === 'PushEvent').slice(0, 3);
          setCommits(pushEvents.map(e => ({
            id: e.id,
            message: e.payload.commits[0]?.message || 'Update',
            repo: e.repo.name,
            time: new Date(e.created_at).toLocaleTimeString()
          })));
        } else {
            // Fallback mock data if API limit reached or user not found
            setCommits([
                { id: 1, message: 'feat: add dashboard', repo: 'personal-site', time: '10:23 AM' },
                { id: 2, message: 'fix: navbar z-index', repo: 'personal-site', time: '09:45 AM' },
                { id: 3, message: 'docs: update readme', repo: 'personal-site', time: 'Yesterday' }
            ]);
        }
      } catch (error) {
        console.error('Failed to fetch commits', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  const toggleStatus = () => {
    setStats(prev => ({
      ...prev,
      status: prev.status === 'coding' ? 'coffee' : 'coding'
    }));
  };

  const handleHeaderClick = (e) => {
    // Only toggle if not dragging
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div 
      className={`sys-dashboard ${isExpanded ? 'expanded' : 'collapsed'} ${isDragging ? 'dragging' : ''}`}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5
      }}
      style={{ willChange: 'transform' }}
    >
      <div className="dashboard-header" onClick={handleHeaderClick}>
        <div className="status-indicator">
          <span className={`dot ${stats.status === 'coding' ? 'busy' : 'idle'}`}></span>
          {isExpanded ? (
            <span className="label">System Status</span>
          ) : (
            <div className="compact-stats">
              <span className="compact-stat cpu">{Math.round(stats.cpu)}%</span>
              <span className="compact-stat ram">{Math.round(stats.memory)}%</span>
              <span className="compact-stat visitors">{stats.visitors}</span>
            </div>
          )}
        </div>
        <button className="toggle-btn">
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="dashboard-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {/* Server Stats */}
            <div className="section server-stats">
              <div className="stat-item">
                <div className="stat-label">
                  <Cpu size={12} /> 
                  <span>CPU</span>
                  <span className="stat-detail">{stats.cpuCores} Cores @ {stats.cpuFreq.toFixed(1)}GHz</span>
                </div>
                <div className="stat-bar">
                  <div className="fill" style={{ width: `${stats.cpu}%`, background: stats.cpu > 80 ? '#ef4444' : '#22c55e' }}></div>
                </div>
                <span className="stat-value">{Math.round(stats.cpu)}%</span>
              </div>
              <div className="stat-item">
                <div className="stat-label">
                  <Activity size={12} /> 
                  <span>RAM</span>
                  <span className="stat-detail">{stats.memoryUsed.toFixed(1)}GB / {stats.memoryTotal}GB</span>
                </div>
                <div className="stat-bar">
                  <div className="fill" style={{ width: `${stats.memory}%`, background: stats.memory > 70 ? '#f59e0b' : '#3b82f6' }}></div>
                </div>
                <span className="stat-value">{Math.round(stats.memory)}%</span>
              </div>
            </div>

            {/* Realtime Visitors */}
            <div className="section visitors">
              <div className="stat-row">
                <span className="icon"><Users size={14} className="text-green-400" /></span>
                <span className="text">Live Visitors</span>
                <span className="value">{stats.visitors}</span>
              </div>
            </div>

            {/* GitHub Activity */}
            <div className="section github">
              <div className="section-title"><GitCommit size={12} /> Recent Activity</div>
              <div className="commit-list">
                {commits.map(commit => (
                  <div key={commit.id} className="commit-item">
                    <span className="msg" title={commit.message}>{commit.message}</span>
                    <span className="time">{commit.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Status */}
            <div className="section personal-status" onClick={toggleStatus}>
              <div className={`status-badge ${stats.status}`}>
                {stats.status === 'coding' ? <Code size={14} /> : <Coffee size={14} />}
                <span>{stats.status === 'coding' ? 'Coding Mode' : 'Coffee Break'}</span>
                <RefreshCw size={10} className="refresh-icon" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
