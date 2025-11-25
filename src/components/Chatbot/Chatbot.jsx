'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.scss';

// Enhanced Knowledge Base
const PROJECTS_DATA = {
  'skill forest': {
    name: 'Skill Forest',
    stack: 'Three.js, React, WebGL, GSAP',
    desc: 'An interactive 3D visualization of technical skills.'
  },
  'live sandbox': {
    name: 'Live Sandbox',
    stack: 'React, Vue, Python, Go, Docker, WebSocket',
    desc: 'A multi-language code playground with real-time execution.'
  },
  'system dashboard': {
    name: 'System Dashboard',
    stack: 'Next.js, TypeScript, GraphQL, Redis',
    desc: 'Real-time monitoring dashboard with GitHub integration.'
  },
  'portfolio': {
    name: 'Portfolio Website',
    stack: 'Next.js, Framer Motion, SCSS, Lucide React',
    desc: 'This modern, responsive portfolio website.'
  }
};

const KNOWLEDGE_BASE = {
  skills: {
    keywords: ['skill', 'technology', 'tech stack', 'language', 'framework', 'tool', 'stack', 'what do you know', 'ability'],
    response: `I possess a comprehensive technical skill set:

**Frontend & UI**: 
React, Next.js, TypeScript, Vue, Tailwind CSS, Framer Motion, Three.js

**Backend & Systems**: 
Node.js, Python (FastAPI), Go, PostgreSQL, Redis, Docker, Kubernetes

**AI & Data**: 
OpenAI API, LangChain, Vector Databases, Python Data Science Stack

I focus on building scalable, performant, and visually stunning applications.`
  },
  
  challenges: {
    keywords: ['challenge', 'difficult', 'hardest', 'problem', 'solve', 'debug', 'complex'],
    response: `The most significant technical challenge I've tackled was **optimizing real-time state synchronization** in the "Live Sandbox" project.

**The Problem**: 
When multiple users edited code simultaneously, the Operational Transformation (OT) algorithm caused significant latency (200ms+) and occasional state divergence under high load.

**The Solution**:
1. **Hybrid Architecture**: Switched from pure OT to a CRDT (Conflict-free Replicated Data Type) approach using Y.js for better decentralized conflict resolution.
2. **Delta Updates**: Implemented binary delta updates over WebSockets instead of sending full JSON objects, reducing payload size by 85%.
3. **Optimistic UI**: Applied local updates immediately while reconciling remote changes in a background worker thread.

**The Result**: 
Latency dropped to <50ms, and the system successfully handled 100+ concurrent active editors in stress tests.`
  },
  
  contact: {
    keywords: ['contact', 'email', 'reach', 'hire', 'collaborate', 'touch', 'message'],
    response: `I'm currently open to new opportunities and collaborations!

**Direct Contact**:
📧 Email: kingford@gemi.com
💼 LinkedIn: /in/kingford
🐙 GitHub: @kingford

**Best way to reach me**:
Send me an email with the subject "Collaboration" or "Project Inquiry". I usually respond within a few hours during business days.`
  },

  experience: {
    keywords: ['experience', 'work', 'job', 'career', 'background', 'history'],
    response: `**Senior Full Stack Engineer** @ TechCorp (2021 - Present)
- Architected a microservices-based e-commerce platform serving 1M+ users.
- Reduced infrastructure costs by 30% through serverless optimization.

**Frontend Developer** @ CreativeStudio (2019 - 2021)
- Developed award-winning interactive websites using WebGL and React.
- Led a team of 3 juniors and established frontend coding standards.

**Junior Developer** @ StartUp Inc (2018 - 2019)
- Built and maintained internal tools and customer-facing dashboards.`
  }
};

const GREETINGS = [
  "Hello! I'm Kingford's AI Assistant. I can tell you about his most complex technical challenges, project tech stacks, or how to get in touch.",
  "Hi there! I'm trained on Kingford's professional background. Ask me about the 'Live Sandbox' architecture or my favorite tech stack!",
];

const FALLBACK_RESPONSES = [
  "I don't have specific data on that, but I can tell you about my **skills**, **projects**, or **toughest technical challenges**.",
  "That's outside my current context window. Try asking: 'What was your hardest technical challenge?' or 'What tech stack did you use for the Portfolio?'",
  "I'm focused on Kingford's professional profile. Feel free to ask about his **experience** or **contact info**!"
];

// Streaming Text Component
const StreamText = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedContent('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete && onComplete();
      }
    }, 15); // Typing speed

    return () => clearInterval(interval);
  }, [content, onComplete]);

  const lines = displayedContent.split('\n');

  return (
    <div className="stream-text">
      {lines.map((line, i) => {
        const isLastLine = i === lines.length - 1;
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <div key={i} style={{ minHeight: '1.5em', marginBottom: '0.5em' }}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="highlight">{part.slice(2, -2)}</strong>;
              }
              return <span key={j}>{part}</span>;
            })}
            {isLastLine && !isComplete && <span className="cursor"></span>}
          </div>
        );
      })}
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: GREETINGS[0],
      timestamp: new Date(),
      isStreaming: false 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestMatch = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 1. Check for specific project tech stack questions
    if (lowerMessage.includes('stack') || lowerMessage.includes('technologies') || lowerMessage.includes('used')) {
      for (const [key, data] of Object.entries(PROJECTS_DATA)) {
        if (lowerMessage.includes(key)) {
          return `For **${data.name}**, the tech stack includes:\n\n${data.stack}.\n\n${data.desc}`;
        }
      }
    }

    // 2. Check general knowledge base
    for (const [category, data] of Object.entries(KNOWLEDGE_BASE)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }
    
    // 3. Fallback
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate network latency
    setTimeout(() => {
      const botResponse = findBestMatch(userMessage.content);
      setIsTyping(false);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        isStreaming: true // Enable streaming for new messages
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Tell me about your hardest technical challenge.",
    "What tech stack did you use for Live Sandbox?",
    "How can I contact you?",
    "What are your core skills?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleStreamComplete = (id) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isStreaming: false } : msg
    ));
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar-container">
            <div className="bot-avatar">
              <Sparkles size={20} />
            </div>
            <span className="status-dot"></span>
          </div>
          <div className="header-info">
            <h1>AI Assistant</h1>
            <p className="status">Powered by Kingford-LLM-v1</p>
          </div>
        </div>
        <button className="reset-btn" onClick={() => setMessages([messages[0]])} title="Reset Chat">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="chat-messages">
        <AnimatePresence mode='popLayout'>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.type}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-avatar">
                {message.type === 'bot' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className="message-content">
                {message.type === 'bot' && message.isStreaming ? (
                  <StreamText 
                    content={message.content} 
                    onComplete={() => handleStreamComplete(message.id)} 
                  />
                ) : (
                  <div className="message-text">
                    {message.type === 'bot' ? (
                      // Re-use the formatter logic for static messages to keep consistency
                      message.content.split('\n').map((line, i) => {
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <div key={i} style={{ minHeight: '1.5em', marginBottom: '0.5em' }}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j} className="highlight">{part.slice(2, -2)}</strong>;
                              }
                              return <span key={j}>{part}</span>;
                            })}
                          </div>
                        );
                      })
                    ) : (
                      message.content
                    )}
                  </div>
                )}
                {isMounted && !message.isStreaming && (
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="message bot typing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-avatar">
              <Bot size={18} />
            </div>
            <div className="message-content loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} className="scroll-anchor" />
      </div>

      <div className="chat-input-area">
        {messages.length < 3 && (
          <div className="quick-questions-scroll">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="quick-btn"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            {isTyping ? <Loader2 size={20} className="spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="disclaimer">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
