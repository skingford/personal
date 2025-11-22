'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';
import './ScrollToTop.scss';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsLaunching(false); // Reset launch state when back at top
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);
    
    // Wait for animation to start before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`scroll-to-top ${isLaunching ? 'launching' : ''}`}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 0 }}
          animate={isLaunching 
            ? { y: -1000, opacity: 0, transition: { duration: 1, ease: "easeIn" } }
            : { opacity: 1, scale: 1, y: 0 }
          }
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={!isLaunching ? { scale: 1.1, rotate: -45 } : {}}
          whileTap={!isLaunching ? { scale: 0.9 } : {}}
          aria-label="Scroll to top"
        >
          <Rocket size={24} className="rocket-icon" />
          {isLaunching && <div className="fire-trail"></div>}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
