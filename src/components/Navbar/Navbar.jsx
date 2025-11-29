'use client';
import React, { useState, useEffect, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const langMenuRef = React.useRef(null);
  const navRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
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
    { name: t('home'), href: `/${locale}/`, type: 'route' },
    { name: t('experience'), href: `/${locale}/experience`, type: 'route' },
    { name: t('resume'), href: `/${locale}/resume`, type: 'route' },
    { 
      name: t('more'), 
      type: 'dropdown',
      items: [
        { name: t('skillForest'), href: `/${locale}/skill-forest`, type: 'route' },
        { name: t('sandbox'), href: `/${locale}/sandbox`, type: 'route' },
        { name: t('chatbot'), href: `/${locale}/chatbot`, type: 'route' },
        { name: t('jukebox'), href: `/${locale}/jukebox`, type: 'route' },
        { name: t('smartNav'), href: `/${locale}/smart-nav`, type: 'route' },
      ]
    },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    setActiveDropdown(null);
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

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
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
      ref={navRef}
    >
      <div className="container navbar-container">
        <Link href={`/${locale}`} className="logo">
          Dev<span className="highlight">.</span>
        </Link>

        <div className="desktop-menu">
          {navLinks.map((link, index) => (
            <div key={link.name} className="nav-item-wrapper">
              {link.type === 'dropdown' ? (
                <div className="dropdown-wrapper">
                  <button 
                    className={`nav-link dropdown-trigger ${activeDropdown === index ? 'active' : ''}`}
                    onClick={() => toggleDropdown(index)}
                    onMouseEnter={() => setActiveDropdown(index)}
                  >
                    {link.name}
                    <ChevronDown size={16} className={`dropdown-icon ${activeDropdown === index ? 'rotate' : ''}`} />
                  </button>
                  {activeDropdown === index && (
                    <div 
                      className="dropdown-menu glass-card"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`dropdown-item ${pathname === subItem.href ? 'active' : ''}`}
                          onClick={(e) => {
                            if (subItem.type === 'hash' && isHome) {
                              e.preventDefault();
                              handleNavClick(subItem);
                            } else {
                              setActiveDropdown(null);
                            }
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
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
              )}
            </div>
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
              <React.Fragment key={link.name}>
                {link.type === 'dropdown' ? (
                  <>
                    <div className="mobile-nav-group-title">{link.name}</div>
                    {link.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="mobile-nav-link sub-link"
                        onClick={(e) => {
                          if (subItem.type === 'hash' && isHome) {
                            e.preventDefault();
                            handleNavClick(subItem);
                          } else {
                            setIsOpen(false);
                          }
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
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
                )}
              </React.Fragment>
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
