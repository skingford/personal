import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.scss';

const projectsData = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with cart functionality, payment processing, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    demoLink: '#',
    codeLink: '#',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team features.',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    image: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    demoLink: '#',
    codeLink: '#',
  },
  {
    title: 'AI Content Generator',
    description: 'SaaS application that uses AI to generate marketing copy and blog posts.',
    tags: ['Next.js', 'OpenAI API', 'PostgreSQL'],
    image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    demoLink: '#',
    codeLink: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="project-image" style={{ background: project.image }}>
                <div className="project-overlay">
                  <a href={project.demoLink} className="project-link" title="View Demo">
                    <ExternalLink size={24} />
                  </a>
                  <a href={project.codeLink} className="project-link" title="View Code">
                    <Github size={24} />
                  </a>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
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
