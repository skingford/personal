'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Smartphone, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import './Skills.scss';

const Skills = () => {
  const t = useTranslations('Skills');

  const skillCategories = [
    {
      title: t('frontend'),
      icon: <Layout size={24} />,
      skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
    {
      title: t('backend'),
      icon: <Server size={24} />,
      skills: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs'],
    },
    {
      title: t('database'),
      icon: <Database size={24} />,
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
    },
    {
      title: t('mobile'),
      icon: <Smartphone size={24} />,
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    },
    {
      title: t('devops'),
      icon: <Globe size={24} />,
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Vercel'],
    },
    {
      title: t('tools'),
      icon: <Code size={24} />,
      skills: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest'],
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="skill-header">
                <div className="icon-box">{category.icon}</div>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
