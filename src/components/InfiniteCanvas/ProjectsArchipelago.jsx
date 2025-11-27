'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import './ProjectsArchipelago.scss';

const ProjectsArchipelago = () => {
  const t = useTranslations('Projects');
  
  // Mock data - in real app, pass as props or fetch
  const projects = [
    {
      id: 1,
      title: t('project1.title'),
      description: t('project1.description'),
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      x: -300,
      y: -100,
      rotation: -5
    },
    {
      id: 2,
      title: t('project2.title'),
      description: t('project2.description'),
      tags: ['Vue.js', 'Firebase', 'Tailwind', 'Jest'],
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      x: 100,
      y: -300,
      rotation: 3
    },
    {
      id: 3,
      title: t('project3.title'),
      description: t('project3.description'),
      tags: ['React Native', 'GraphQL', 'AWS', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      x: -200,
      y: -500,
      rotation: 8
    }
  ];

  return (
    <div className="projects-archipelago">
      <h2 className="archipelago-title">Project Archipelago</h2>
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="project-island"
          style={{
            left: project.x,
            top: project.y,
            rotate: project.rotation
          }}
          whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
        >
          <div className="island-content">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsArchipelago;
