'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.scss';

// Knowledge base - 可以根据实际情况定制
const KNOWLEDGE_BASE = {
  skills: {
    keywords: ['skill', 'technology', 'tech stack', 'language', 'framework', 'tool', '技能', '技术栈', '语言', '框架'],
    response: `I'm proficient in a wide range of technologies:

**Frontend**: React, Vue, Angular, Next.js, TypeScript, HTML5, CSS3, SCSS, Tailwind CSS
**Backend**: Node.js, Python, Go, Rust, Express, FastAPI
**Database**: PostgreSQL, MongoDB, Redis, MySQL
**DevOps**: Docker, Kubernetes, AWS, CI/CD, GitHub Actions
**3D/Graphics**: Three.js, WebGL, Canvas API
**Tools**: Git, VS Code, Figma, Postman

I'm always learning and exploring new technologies!`
  },
  
  projects: {
    keywords: ['project', 'portfolio', 'work', 'built', 'created', '项目', '作品'],
    response: `I've worked on several exciting projects:

🌲 **Skill Forest** - An interactive 3D visualization of my technical skills using Three.js
💻 **Live Sandbox** - A multi-language code playground supporting React, Vue, Python, Go, and more
📊 **System Dashboard** - Real-time monitoring dashboard with GitHub integration
🎨 **Portfolio Website** - This very site you're on, built with Next.js and modern web technologies

Each project showcases different aspects of full-stack development!`
  },
  
  challenges: {
    keywords: ['challenge', 'difficult', 'problem', 'solve', 'debug', '挑战', '困难', '问题'],
    response: `One of the most challenging problems I've tackled was building a real-time collaborative code editor with live preview.

**The Challenge**: Synchronizing code changes across multiple users while maintaining performance and handling conflicts.

**Solution**: 
- Implemented Operational Transformation (OT) for conflict resolution
- Used WebSocket for real-time communication
- Optimized rendering with virtual DOM diffing
- Added debouncing for preview updates

**Result**: A smooth, lag-free collaborative experience that handles 50+ concurrent users.

This taught me the importance of algorithm design and performance optimization in real-world applications.`
  },
  
  contact: {
    keywords: ['contact', 'email', 'reach', 'hire', 'collaborate', '联系', '邮箱', '合作'],
    response: `I'd love to hear from you! Here's how you can reach me:

📧 **Email**: your.email@example.com
💼 **LinkedIn**: linkedin.com/in/yourprofile
🐙 **GitHub**: github.com/yourusername
🐦 **Twitter**: @yourhandle

Feel free to reach out for:
- Collaboration opportunities
- Technical discussions
- Project inquiries
- Just to say hi!

I typically respond within 24 hours.`
  },
  
  experience: {
    keywords: ['experience', 'work', 'job', 'career', 'background', '经验', '工作', '经历'],
    response: `I have 5+ years of experience in full-stack development:

**Senior Full Stack Engineer** (2021 - Present)
- Leading development of scalable web applications
- Mentoring junior developers
- Implementing best practices and code reviews

**Frontend Developer** (2019 - 2021)
- Built responsive, accessible user interfaces
- Improved performance by 40%
- Collaborated with design teams

**Junior Developer** (2018 - 2019)
- Developed features for client websites
- Learned industry best practices
- Contributed to open-source projects

I'm passionate about creating elegant solutions to complex problems!`
  },
  
  education: {
    keywords: ['education', 'degree', 'study', 'university', 'school', '学历', '教育', '大学'],
    response: `**Education Background**:

🎓 **Master of Computer Science**
Stanford University (2016-2018)
- Focus: Distributed Systems & AI
- GPA: 3.9/4.0

🎓 **Bachelor of Computer Engineering**
UC Berkeley (2012-2016)
- Honors Graduate
- Dean's List all semesters

I'm also a lifelong learner, constantly taking online courses and attending tech conferences!`
  }
};

const GREETINGS = [
  "Hello! I'm your AI assistant. Ask me anything about my skills, projects, or experience!",
  "Hi there! 👋 I can help you learn more about my technical background. What would you like to know?",
  "Welcome! Feel free to ask about my projects, skills, or how to get in touch!"
];

const FALLBACK_RESPONSES = [
  "That's an interesting question! While I don't have specific information about that, feel free to ask me about my skills, projects, experience, or how to contact me.",
  "I'm not sure I understand that question completely. Try asking me about my technical skills, past projects, or professional experience!",
  "Hmm, I don't have a good answer for that. But I'd be happy to tell you about my work experience, tech stack, or recent projects!"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fix hydration mismatch by only rendering timestamps on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each category in knowledge base
    for (const [category, data] of Object.entries(KNOWLEDGE_BASE)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
        return data.response;
      }
    }
    
    // If no match found, return a fallback response
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

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = findBestMatch(input);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // Random delay between 0.8-2s for realism
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What are your main skills?",
    "Tell me about your projects",
    "What's your biggest challenge?",
    "How can I contact you?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar">
            <Bot size={24} />
            <span className="status-dot"></span>
          </div>
          <div className="header-info">
            <h1>AI Assistant</h1>
            <p className="status">Online • Ready to help</p>
          </div>
        </div>
        <Sparkles size={20} className="sparkle-icon" />
      </div>

      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.type}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-avatar">
                {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                {isMounted && (
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="quick-questions">
          <p className="quick-title">Quick questions:</p>
          <div className="questions-grid">
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
        </div>
      )}

      <div className="chat-input-container">
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder="Ask me anything about my skills, projects, or experience..."
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
    </div>
  );
};

export default Chatbot;
