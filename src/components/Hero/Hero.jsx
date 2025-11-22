'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import './Hero.scss';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="greeting">Hello, I'm</h2>
          <h1 className="name">
            <span className="gradient-text">Full Stack</span> Engineer
          </h1>
          <p className="description">
            Crafting elegant, high-performance digital experiences. I build scalable web applications with a focus on design and user experience.
          </p>
          
          <div className="cta-buttons">
            <a href="#projects" className="btn primary">
              View Work <ArrowRight size={20} />
            </a>
            <a href="#contact" className="btn secondary">
              Contact Me
            </a>
          </div>

          <div className="social-links">
            <a href="#" className="social-icon"><Github size={24} /></a>
            <a href="#" className="social-icon"><Linkedin size={24} /></a>
            <a href="#" className="social-icon"><Mail size={24} /></a>
          </div>
        </motion.div>

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
