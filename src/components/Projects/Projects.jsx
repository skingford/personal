'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import './Projects.scss';

const Projects = () => {
  const t = useTranslations('Projects');

  const projects = [
    {
      id: 1,
      title: t('project1.title'),
      description: t('project1.description'),
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 2,
      title: t('project2.title'),
      description: t('project2.description'),
      tags: ['Vue.js', 'Firebase', 'Tailwind', 'Jest'],
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 3,
      title: t('project3.title'),
      description: t('project3.description'),
      tags: ['Next.js', 'OpenAI API', 'PostgreSQL', 'Vercel'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="overlay">
                  <div className="links">
                    <a href="#" className="link-btn" title={t('viewProject')}>
                      <ExternalLink size={24} />
                    </a>
                    <a href="#" className="link-btn" title={t('sourceCode')}>
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
