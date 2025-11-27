'use client';
import React from 'react';
import Hero from '@/components/Hero/Hero';
import TechGalaxy from './TechGalaxy';
import ProjectsArchipelago from './ProjectsArchipelago';
import './World.scss';

const World = () => {
  return (
    <div className="world-container">
      {/* Center - About Me / Hero */}
      <div className="world-section center-section">
        <div className="hero-wrapper">
          <Hero />
        </div>
      </div>

      {/* Top Left - Projects Archipelago */}
      <div className="world-section top-left-section">
        <ProjectsArchipelago />
      </div>

      {/* Bottom Right - Tech Galaxy */}
      <div className="world-section bottom-right-section">
        <TechGalaxy />
      </div>
      
      {/* Connectors / Decorations */}
      <svg className="world-connectors">
        {/* Lines connecting sections could go here */}
        <line x1="0" y1="0" x2="-800" y2="-800" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        <line x1="0" y1="0" x2="800" y2="800" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default World;
