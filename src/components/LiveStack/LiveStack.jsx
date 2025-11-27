'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Music, Code2, Terminal, Cpu } from 'lucide-react';
import GithubActivity from './GithubActivity';
import './LiveStack.scss';

const StatusCard = () => {
  // Mock data for now - in a real app this would fetch from WakaTime API
  const [stats, setStats] = useState({
    language: 'TypeScript',
    time: '4 hrs 23 mins',
    project: 'personal-website',
    status: 'Coding'
  });

  return (
    <div className="dashboard-card status-card">
      <div className="card-header">
        <Code2 size={20} className="text-blue-400" />
        <h3>Dev Status</h3>
        <div className="live-indicator" />
      </div>
      
      <div className="status-content">
        <div className="stat-row">
          <span className="label">Current Focus</span>
          <span className="value highlight">{stats.language}</span>
        </div>
        <div className="stat-row">
          <span className="label">Time Today</span>
          <span className="value">{stats.time}</span>
        </div>
        <div className="stat-row">
          <span className="label">Project</span>
          <span className="value mono">{stats.project}</span>
        </div>
        
        <div className="terminal-view">
          <div className="terminal-header">
            <Terminal size={12} />
            <span>zsh</span>
          </div>
          <div className="terminal-body">
            <span className="prompt">➜  ~</span> npm run dev<br/>
            <span className="success">ready</span> started server on 0.0.0.0:3000
          </div>
        </div>
      </div>
    </div>
  );
};

const MusicCard = () => {
  // Mock data - would fetch from Spotify API
  const [track, setTrack] = useState({
    name: 'Dreaming of You',
    artist: 'The Coral',
    isPlaying: true
  });

  return (
    <div className="dashboard-card music-card">
      <div className="card-header">
        <Music size={20} className="text-green-400" />
        <h3>Now Playing</h3>
        {track.isPlaying && <div className="live-indicator" style={{ backgroundColor: '#1db954', boxShadow: '0 0 10px #1db954' }} />}
      </div>
      
      <div className="music-content">
        <div className="album-art">
          <div className="vinyl-spin" />
          <div className="music-bars">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
        <div className="track-info">
          <div className="track-name">{track.name}</div>
          <div className="artist-name">{track.artist}</div>
        </div>
      </div>
    </div>
  );
};

const LiveStack = () => {
  return (
    <section className="live-stack">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live Tech Stack
        </motion.h2>

        <div className="dashboard-grid">
          {/* GitHub Activity - Large Card */}
          <motion.div 
            className="dashboard-card github-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="card-header">
              <Activity size={20} className="text-purple-400" />
              <h3>GitHub Activity</h3>
              <div className="live-indicator" />
            </div>
            <div className="chart-container" style={{ height: '350px' }}>
              <GithubActivity username="skingford" />
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ display: 'contents' }}
          >
            <StatusCard />
          </motion.div>

          {/* Music Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ display: 'contents' }}
          >
            <MusicCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStack;
