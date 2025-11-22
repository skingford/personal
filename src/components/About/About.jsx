'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import './About.scss';

const About = () => {
  const t = useTranslations('About');

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>
        
        <div className="about-content">
          <motion.div
            className="about-text glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-item glass-card">
              <h3>5+</h3>
              <p>{t('yearsExperience')}</p>
            </div>
            <div className="stat-item glass-card">
              <h3>50+</h3>
              <p>{t('projectsCompleted')}</p>
            </div>
            <div className="stat-item glass-card">
              <h3>20+</h3>
              <p>{t('happyClients')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
