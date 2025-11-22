'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  const navLinks = [
    { name: 'Home', href: '/#home', type: 'hash' },
    { name: 'About', href: '/#about', type: 'hash' },
    { name: 'Skills', href: '/#skills', type: 'hash' },
    { name: 'Projects', href: '/#projects', type: 'hash' },
    { name: 'Experience', href: '/experience', type: 'route' },
    { name: 'Contact', href: '/#contact', type: 'hash' },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.type === 'hash' && isHome) {
      // If on home page and clicking hash link, smooth scroll
      const element = document.querySelector(link.href.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container navbar-container">
        <Link href="/" className="logo">
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
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
