'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createBlock, simulateMining } from '@/utils/blockchain';
import BulletScreen from './BulletScreen/BulletScreen';
import './Contact.scss';

const Contact = () => {
  const t = useTranslations('Contact');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [isMining, setIsMining] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) return;

    setIsMining(true);
    
    // Simulate mining delay
    await simulateMining(1200);
    
    // Create blockchain block
    const block = await createBlock(message, name);
    
    // Add to blocks
    setBlocks(prev => [...prev, block]);
    
    setIsMining(false);
    setShowSuccess(true);
    
    // Reset form
    setName('');
    setMessage('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <BulletScreen messages={blocks} />
      
      <section id="contact" className="contact">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('title')}
          </motion.h2>

          <div className="contact-content">
            <motion.div
              className="contact-info glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>{t('subtitle')}</h3>
              <p>
                {t('description')}
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="icon-box">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4>{t('email')}</h4>
                    <p>hello@example.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4>{t('location')}</h4>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4>{t('phone')}</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="guestbook-container glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="guestbook-header">
                <h3>🔗 {t('guestbook.title')}</h3>
                <p className="guestbook-subtitle">
                  {t('guestbook.subtitle')} ⛓️
                </p>
              </div>

              <form onSubmit={handleSubmit} className="guestbook-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={t('guestbook.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isMining}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder={t('guestbook.messagePlaceholder')}
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={isMining}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={`btn primary submit-btn ${isMining ? 'mining' : ''}`}
                  disabled={isMining}
                >
                  {isMining ? (
                    <>
                      <Loader2 size={18} className="spinning" />
                      {t('guestbook.miningButton')}
                    </>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      {t('guestbook.mintedButton')}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t('guestbook.mintButton')}
                    </>
                  )}
                </button>
              </form>

              {/* Recent Blocks */}
              <div className="recent-blocks">
                <h4>{t('guestbook.recentBlocks')}</h4>
                <div className="blocks-list">
                  <AnimatePresence>
                    {blocks.slice(-5).reverse().map((block) => (
                      <motion.div
                        key={block.id}
                        className="block-item"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        layout
                      >
                        <div className="block-header">
                          <span className="block-author">{block.author}</span>
                          <span className="block-number">#{block.blockNumber}</span>
                        </div>
                        <p className="block-message">{block.message}</p>
                        <div className="block-meta">
                          <span className="block-hash" title={block.fullHash}>
                            {t('guestbook.hash')}: {block.hash}
                          </span>
                          <span className="block-tx" title={block.fullTxId}>
                            {t('guestbook.tx')}: {block.txId}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {blocks.length === 0 && (
                    <div className="empty-state">
                      <p>{t('guestbook.emptyState')}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
