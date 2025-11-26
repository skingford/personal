'use client';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Printer, Mail, MapPin, Phone, Globe, Github, Linkedin, Terminal, FileText, Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TerminalResume from '@/components/Resume/TerminalResume';
import './Resume.scss';

const ResumeClient = () => {
  const t = useTranslations('Resume');
  const tContact = useTranslations('Contact');
  const tHero = useTranslations('Hero');
  const tExp = useTranslations('Experience');
  const tProjects = useTranslations('Projects');
  
  const [viewMode, setViewMode] = useState('traditional');
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Resume - Full Stack Engineer',
  });

  return (
    <div className="resume-page">
      <div className="container">
        <div className="resume-actions">
          <div className="view-switcher">
            <button 
              className={viewMode === 'traditional' ? 'active' : ''} 
              onClick={() => setViewMode('traditional')}
            >
              <FileText size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Traditional
            </button>
            <button 
              className={viewMode === 'terminal' ? 'active' : ''} 
              onClick={() => setViewMode('terminal')}
            >
              <Terminal size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Terminal
            </button>
          </div>

          <a href="/api/v1/resume" target="_blank" className="api-hint" title="Get JSON Data">
            <Code size={16} /> GET /api/v1/resume
          </a>

          {viewMode === 'traditional' && (
            <button onClick={handlePrint} className="btn primary">
              <Download size={18} style={{ marginRight: '8px' }} /> {t('download')}
            </button>
          )}
        </div>

        {viewMode === 'traditional' ? (
          <motion.div 
            className="resume-paper" 
            ref={componentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="resume-header">
              <div className="header-left">
                <h1>Dev Name</h1>
                <h2>{tHero('role')}</h2>
              </div>
              <div className="header-right">
                <div>hello@example.com <Mail size={14} /></div>
                <div>+1 (555) 123-4567 <Phone size={14} /></div>
                <div>San Francisco, CA <MapPin size={14} /></div>
                <div>github.com/dev <Github size={14} /></div>
              </div>
            </header>

            {/* Summary */}
            <section className="resume-section">
              <h3>{t('summary')}</h3>
              <p>{tHero('description')} {tContact('description')}</p>
            </section>

            {/* Experience */}
            <section className="resume-section">
              <h3>{t('experience')}</h3>
              
              <div className="resume-item">
                <div className="item-header">
                  <h4>{tExp('role1')}</h4>
                  <span>2022 - {tExp('present')}</span>
                </div>
                <div className="item-sub">Tech Innovations Inc.</div>
                <p>{tExp('desc1')}</p>
                <ul>
                  <li>Led a team of 5 developers in building a cloud-native SaaS platform.</li>
                  <li>Reduced server costs by 30% through infrastructure optimization.</li>
                  <li>Implemented CI/CD pipelines reducing deployment time by 50%.</li>
                </ul>
              </div>

              <div className="resume-item">
                <div className="item-header">
                  <h4>{tExp('role2')}</h4>
                  <span>2020 - 2022</span>
                </div>
                <div className="item-sub">Creative Solutions Agency</div>
                <p>{tExp('desc2')}</p>
                <ul>
                  <li>Developed responsive web applications for high-profile clients.</li>
                  <li>Collaborated with UX/UI designers to implement pixel-perfect designs.</li>
                </ul>
              </div>
            </section>

            <div className="grid-2-col">
              {/* Skills */}
              <section className="resume-section">
                <h3>{t('skills')}</h3>
                <div className="skills-list">
                  <span>React</span>
                  <span>Next.js</span>
                  <span>Node.js</span>
                  <span>TypeScript</span>
                  <span>AWS</span>
                  <span>Docker</span>
                  <span>GraphQL</span>
                  <span>PostgreSQL</span>
                  <span>Tailwind CSS</span>
                  <span>Git</span>
                </div>
              </section>

              {/* Education */}
              <section className="resume-section">
                <h3>{t('education')}</h3>
                <div className="resume-item">
                  <div className="item-header">
                    <h4>{t('education1.degree')}</h4>
                  </div>
                  <div className="item-sub">{t('education1.school')}</div>
                  <span>{t('education1.year')}</span>
                </div>
                <div className="resume-item">
                  <div className="item-header">
                    <h4>{t('education2.degree')}</h4>
                  </div>
                  <div className="item-sub">{t('education2.school')}</div>
                  <span>{t('education2.year')}</span>
                </div>
              </section>
            </div>

            {/* Projects */}
            <section className="resume-section">
              <h3>{t('projects')}</h3>
              <div className="resume-item">
                <div className="item-header">
                  <h4>{tProjects('project1.title')}</h4>
                </div>
                <p>{tProjects('project1.description')}</p>
              </div>
              <div className="resume-item">
                <div className="item-header">
                  <h4>{tProjects('project2.title')}</h4>
                </div>
                <p>{tProjects('project2.description')}</p>
              </div>
            </section>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TerminalResume />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeClient;
