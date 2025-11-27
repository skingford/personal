'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ProjectModal from './ProjectModal';
import DebugWrapper from '@/components/Debug/DebugWrapper';
import './Projects.scss';

const Projects = () => {
  const t = useTranslations('Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: t('project1.title'),
      description: t('project1.description'),
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: '#',
      githubUrl: '#',
      architecture: [
        {
          name: 'React Frontend',
          description: 'SPA with Redux state management',
          icon: '⚛️',
          type: 'frontend'
        },
        {
          name: 'Node.js API',
          description: 'RESTful API with Express.js',
          icon: '🟢',
          type: 'backend'
        },
        {
          name: 'Redis Cache',
          description: 'Session storage & caching layer',
          icon: '🔴',
          type: 'cache'
        },
        {
          name: 'PostgreSQL',
          description: 'Relational database for product catalog',
          icon: '🐘',
          type: 'database'
        },
        {
          name: 'Stripe API',
          description: 'Payment processing integration',
          icon: '💳',
          type: 'service'
        }
      ],
      features: [
        'Real-time inventory management',
        'Secure payment processing with Stripe',
        'Admin dashboard with analytics',
        'Shopping cart with Redis caching',
        'Email notifications for orders'
      ]
    },
    {
      id: 2,
      title: t('project2.title'),
      description: t('project2.description'),
      tags: ['Vue.js', 'Firebase', 'Tailwind', 'Jest'],
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: '#',
      githubUrl: '#',
      architecture: [
        {
          name: 'Vue.js Frontend',
          description: 'Component-based UI with Vuex',
          icon: '💚',
          type: 'frontend'
        },
        {
          name: 'Firebase Auth',
          description: 'User authentication & authorization',
          icon: '🔐',
          type: 'service'
        },
        {
          name: 'Cloud Firestore',
          description: 'Real-time NoSQL database',
          icon: '☁️',
          type: 'database'
        },
        {
          name: 'Firebase Functions',
          description: 'Serverless backend logic',
          icon: '⚡',
          type: 'backend'
        },
        {
          name: 'Firebase Hosting',
          description: 'CDN-backed static hosting',
          icon: '🌐',
          type: 'service'
        }
      ],
      features: [
        'Real-time collaboration features',
        'Drag-and-drop task management',
        'Team member permissions',
        'Activity timeline and notifications',
        'File attachments with Cloud Storage'
      ]
    },
    {
      id: 3,
      title: t('project3.title'),
      description: t('project3.description'),
      tags: ['Next.js', 'OpenAI API', 'PostgreSQL', 'Vercel'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      liveUrl: '#',
      githubUrl: '#',
      architecture: [
        {
          name: 'Next.js Frontend',
          description: 'SSR React with API routes',
          icon: '▲',
          type: 'frontend'
        },
        {
          name: 'Next.js API Routes',
          description: 'Serverless API endpoints',
          icon: '🔌',
          type: 'backend'
        },
        {
          name: 'OpenAI API',
          description: 'GPT-4 content generation',
          icon: '🤖',
          type: 'service'
        },
        {
          name: 'Redis Cache',
          description: 'Response caching & rate limiting',
          icon: '🔴',
          type: 'cache'
        },
        {
          name: 'PostgreSQL',
          description: 'User data & content storage',
          icon: '🐘',
          type: 'database'
        },
        {
          name: 'Vercel Edge',
          description: 'Global CDN deployment',
          icon: '🌍',
          type: 'service'
        }
      ],
      features: [
        'AI-powered content generation',
        'Template library with customization',
        'Usage analytics and tracking',
        'Multi-language support',
        'Export to multiple formats (PDF, DOCX, HTML)'
      ]
    },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section id="projects" className="projects">
        <div className="container">
          <DebugWrapper data={{ component: 'Projects', count: projects.length, items: projects.map(p => ({ id: p.id, title: p.title, tags: p.tags })) }}>
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
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="overlay">
                    <div className="overlay-content">
                      <span className="view-case-study">View Case Study</span>
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
          </DebugWrapper>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;
