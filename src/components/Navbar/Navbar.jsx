'use client';
import React, { useState, useEffect, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const langMenuRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHome = pathname === `/${locale}` || pathname === '/';

  const navLinks = [
    { name: t('home'), href: `/${locale}/#home`, type: 'hash' },
    { name: t('about'), href: `/${locale}/#about`, type: 'hash' },
    { name: t('skills'), href: `/${locale}/#skills`, type: 'hash' },
    { name: t('projects'), href: `/${locale}/#projects`, type: 'hash' },
    { name: t('experience'), href: `/${locale}/experience`, type: 'route' },
    { name: t('contact'), href: `/${locale}/#contact`, type: 'hash' },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.type === 'hash' && isHome) {
      const element = document.querySelector(link.href.split('#')[1] ? '#' + link.href.split('#')[1] : '');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLanguageChange = (newLocale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    startTransition(() => {
      router.replace(newPath);
    });
    setIsLangMenuOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁體中文' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container navbar-container">
        <Link href={`/${locale}`} className="logo">
          Dev<span className="highlight">.</span>
        </Link>

        <div className="desktop-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={(e) => {
                if (link.type === 'hash' && isHome) {
                  e.preventDefault();
                  handleNavClick(link);
                }
              }}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="lang-switcher" ref={langMenuRef}>
            <button 
              className="lang-btn"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <Globe size={20} />
            </button>
            {isLangMenuOpen && (
              <div className="lang-menu glass-card">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${locale === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={isPending}
                  >
                    <span>{lang.label}</span>
                    {locale === lang.code && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => {
                  if (link.type === 'hash' && isHome) {
                    e.preventDefault();
                    handleNavClick(link);
                  } else {
                    setIsOpen(false);
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
            <div className="mobile-lang-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`mobile-lang-btn ${locale === lang.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
