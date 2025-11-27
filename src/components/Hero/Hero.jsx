'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DebugWrapper from '@/components/Debug/DebugWrapper';
import './Hero.scss';

const Hero = () => {
  const t = useTranslations('Hero');

  const heroData = {
    component: 'Hero',
    greeting: t('greeting'),
    role: t('role'),
    description: t('description'),
    actions: [
      { label: t('viewWork'), link: '#projects', type: 'primary' },
      { label: t('contactMe'), link: '#contact', type: 'secondary' }
    ],
    socials: ['Github', 'Linkedin', 'Mail']
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <DebugWrapper data={heroData} className="hero-content-wrapper">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="greeting">{t('greeting')}</h2>
            <h1 className="name">
              <span className="gradient-text">{t('role')}</span>
            </h1>
            <p className="description">
              {t('description')}
            </p>
            
            <div className="cta-buttons">
              <a href="#projects" className="btn primary">
                {t('viewWork')} <ArrowRight size={20} />
              </a>
              <a href="#contact" className="btn secondary">
                {t('contactMe')}
              </a>
            </div>

            <div className="social-links">
              <a href="#" className="social-icon"><Github size={24} /></a>
              <a href="#" className="social-icon"><Linkedin size={24} /></a>
              <a href="#" className="social-icon"><Mail size={24} /></a>
            </div>
          </motion.div>
        </DebugWrapper>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="blob-container">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
