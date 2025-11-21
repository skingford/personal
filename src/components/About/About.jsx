import React from 'react';
import { motion } from 'framer-motion';
import './About.scss';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div
            className="about-text glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p>
              I am a passionate Full Stack Engineer with a deep love for creating beautiful and functional digital solutions. With years of experience in both frontend and backend development, I bridge the gap between design and engineering.
            </p>
            <p>
              My journey started with a curiosity for how things work on the web, which led me to master technologies like React, Node.js, and cloud infrastructure. I believe in writing clean, maintainable code and designing user interfaces that are intuitive and delightful.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee while reading about design trends.
            </p>
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
              <p>Years Experience</p>
            </div>
            <div className="stat-item glass-card">
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item glass-card">
              <h3>20+</h3>
              <p>Happy Clients</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
