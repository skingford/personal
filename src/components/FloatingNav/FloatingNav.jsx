'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Folder, Mail, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import './FloatingNav.scss';

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = useTranslations('Navbar');

  const navItems = [
    { id: 'home', icon: <Home size={20} />, label: t('home') },
    { id: 'about', icon: <User size={20} />, label: t('about') },
    { id: 'skills', icon: <Code size={20} />, label: t('skills') },
    { id: 'projects', icon: <Folder size={20} />, label: t('projects') },
    { id: 'contact', icon: <Mail size={20} />, label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      setIsVisible(window.scrollY > 300);

      // Update active section
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="floating-nav"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="nav-pill">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
              >
                <div className="icon-wrapper">
                  {item.icon}
                </div>
                <span className="tooltip">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            <div className="divider" />
            
            <button 
              className="nav-item scroll-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <div className="icon-wrapper">
                <ArrowUp size={20} />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
