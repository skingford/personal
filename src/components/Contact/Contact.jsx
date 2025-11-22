'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import './Contact.scss';

const Contact = () => {
  const t = useTranslations('Contact');

  return (
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

          <motion.form
            className="contact-form glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="form-group">
              <input type="text" placeholder={t('form.name')} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder={t('form.email')} required />
            </div>
            <div className="form-group">
              <input type="text" placeholder={t('form.subject')} required />
            </div>
            <div className="form-group">
              <textarea placeholder={t('form.message')} rows="5" required></textarea>
            </div>
            <button type="submit" className="btn primary submit-btn">
              {t('form.send')} <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
