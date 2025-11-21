import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Smartphone, Globe } from 'lucide-react';
import './Skills.css';

const skillsData = [
  {
    category: 'Frontend',
    icon: <Layout size={32} />,
    items: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  },
  {
    category: 'Backend',
    icon: <Server size={32} />,
    items: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'Database',
    icon: <Database size={32} />,
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
  },
  {
    category: 'Mobile',
    icon: <Smartphone size={32} />,
    items: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    category: 'DevOps',
    icon: <Globe size={32} />,
    items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Vercel'],
  },
  {
    category: 'Tools',
    icon: <Code size={32} />,
    items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technical Skills
        </motion.h2>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.category}
              className="skill-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.category}</h3>
              <ul className="skill-list">
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
