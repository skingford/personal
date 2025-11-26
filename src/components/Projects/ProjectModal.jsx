'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Play } from 'lucide-react';
import './ProjectModal.scss';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="modal-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              drag
              dragMomentum={false}
            >
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="modal-content">
              {/* Left Side - Demo */}
              <div className="modal-demo">
                <div className="demo-header">
                  <Play size={20} />
                  <h3>Live Demo</h3>
                </div>
                
                {project.video ? (
                  <div className="demo-video">
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                ) : project.gif ? (
                  <div className="demo-gif">
                    <img src={project.gif} alt={`${project.title} demo`} />
                  </div>
                ) : (
                  <div className="demo-placeholder">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}

                <div className="demo-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary"
                    >
                      <ExternalLink size={18} />
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn secondary"
                    >
                      <Github size={18} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* Right Side - Architecture */}
              <div className="modal-details">
                <h2>{project.title}</h2>
                <p className="project-description">{project.description}</p>

                {/* Tech Stack */}
                <div className="tech-stack">
                  <h4>Tech Stack</h4>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Diagram */}
                <div className="architecture">
                  <h4>System Architecture</h4>
                  <div className="architecture-diagram">
                    {project.architecture ? (
                      <div className="architecture-flow">
                        {project.architecture.map((layer, index) => (
                          <React.Fragment key={index}>
                            <motion.div
                              className="architecture-node"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className={`node-icon ${layer.type}`}>
                                {layer.icon}
                              </div>
                              <div className="node-content">
                                <h5>{layer.name}</h5>
                                <p>{layer.description}</p>
                              </div>
                            </motion.div>
                            {index < project.architecture.length - 1 && (
                              <motion.div
                                className="architecture-arrow"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: index * 0.1 + 0.05 }}
                              >
                                <svg viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M5 12h14m-7-7l7 7-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </motion.div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <p className="no-architecture">Architecture diagram coming soon...</p>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                {project.features && (
                  <div className="key-features">
                    <h4>Key Features</h4>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
