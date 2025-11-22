import React from 'react';
import { useTranslations } from 'next-intl';
import './Footer.scss';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {new Date().getFullYear()} Dev. {t('rights')}</p>
        <div className="footer-links">
          <a href="#">{t('privacy')}</a>
          <a href="#">{t('terms')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
