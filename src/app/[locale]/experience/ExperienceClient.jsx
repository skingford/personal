'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import '../../../styles/Experience.scss';

const ExperienceClient = () => {
  const t = useTranslations('Experience');

  const experiences = [
    {
      id: 1,
      role: t('role1'),
      company: 'Tech Innovations Inc.',
      period: `2022 - ${t('present')}`,
      description: t('desc1'),
      technologies: ['React', 'Node.js', 'AWS', 'TypeScript'],
    },
    {
      id: 2,
      role: t('role2'),
      company: 'Creative Solutions Agency',
      period: '2020 - 2022',
      description: t('desc2'),
      technologies: ['Vue.js', 'Sass', 'Webpack', 'Figma'],
    },
    {
      id: 3,
      role: t('role3'),
      company: 'StartUp Hub',
      period: '2018 - 2020',
      description: t('desc3'),
      technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
    },
  ];

  return (
    <div className="experience-page">
      <div className="container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h1>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <div className="role-company">
                    <h3>{exp.role}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  <div className="period">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <p className="description">{exp.description}</p>
                <div className="tech-stack">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="timeline-dot">
                <Briefcase size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceClient;
