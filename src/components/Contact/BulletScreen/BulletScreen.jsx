'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BulletScreen.scss';

/**
 * BulletScreen Component - Displays floating messages like Danmaku/Barrage
 */
const BulletScreen = ({ messages }) => {
  const [activeMessages, setActiveMessages] = useState([]);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      
      // Add the new message with a random vertical position
      const newMessage = {
        ...latestMessage,
        top: Math.random() * 70 + 10, // Random position between 10% and 80%
        duration: 8 + Math.random() * 4, // Random duration 8-12s
      };
      
      setActiveMessages(prev => [...prev, newMessage]);

      // Remove the message after animation completes
      setTimeout(() => {
        setActiveMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      }, newMessage.duration * 1000);
    }
  }, [messages]);

  return (
    <div className="bullet-screen">
      <AnimatePresence>
        {activeMessages.map((msg) => (
          <motion.div
            key={msg.id}
            className="bullet-message"
            style={{ top: `${msg.top}%` }}
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: '-100%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: msg.duration,
              ease: 'linear',
            }}
          >
            <div className="bullet-content">
              <span className="bullet-author">{msg.author}</span>
              <span className="bullet-text">{msg.message}</span>
              <span className="bullet-hash">#{msg.hash}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BulletScreen;
