'use client';
import React, { useState, useEffect, useRef } from 'react';
import resumeData from '@/data/resume.json';
import './TerminalResume.scss';

const TerminalResume = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const fileSystem = {
    'resume.json': { type: 'file', content: JSON.stringify(resumeData, null, 2) },
    'projects': { type: 'dir', content: ['skill-forest', 'live-sandbox', 'system-dashboard'] },
    'contact.txt': { type: 'file', content: `Email: ${resumeData.basics.email}\nPhone: ${resumeData.basics.phone}\nGitHub: ${resumeData.basics.profiles[0].url}` },
    'skills.txt': { type: 'file', content: resumeData.skills.map(s => `${s.name}: ${s.keywords.join(', ')}`).join('\n') }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';
    let type = 'success';

    switch (command) {
      case 'help':
        output = 'Available commands:\n  ls              List directory contents\n  cat <file>      Display file contents\n  whoami          Display current user\n  clear           Clear terminal output\n  help            Show this help message';
        break;
      case 'ls':
        output = Object.keys(fileSystem).map(key => {
          return fileSystem[key].type === 'dir' ? `${key}/` : key;
        }).join('  ');
        break;
      case 'cat':
        if (args.length === 0) {
          output = 'Usage: cat <filename>';
          type = 'error';
        } else {
          const filename = args[0];
          if (fileSystem[filename]) {
            if (fileSystem[filename].type === 'dir') {
              output = `cat: ${filename}: Is a directory`;
              type = 'error';
            } else {
              output = fileSystem[filename].content;
              if (filename.endsWith('.json')) type = 'json';
            }
          } else {
            output = `cat: ${filename}: No such file or directory`;
            type = 'error';
          }
        }
        break;
      case 'whoami':
        output = 'guest';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        break;
      default:
        output = `command not found: ${command}`;
        type = 'error';
    }

    if (trimmedCmd) {
      setHistory(prev => [...prev, { command: trimmedCmd, output, type }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      const current = parts[parts.length - 1];
      
      if (parts.length === 1) {
        // Command completion
        const commands = ['help', 'ls', 'cat', 'whoami', 'clear'];
        const matches = commands.filter(cmd => cmd.startsWith(current));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        }
      } else if (parts.length === 2) {
        // File completion
        const matches = Object.keys(fileSystem).filter(file => file.startsWith(current));
        if (matches.length === 1) {
          setInput(parts[0] + ' ' + matches[0]);
        }
      }
    }
  };

  return (
    <div className="terminal-resume" ref={containerRef} onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>
      
      <div className="terminal-content">
        <div className="terminal-output">
          <div className="result success">
            Welcome to Kingford's Interactive Resume v1.0.0
            Type 'help' to see available commands.
          </div>
          {history.map((entry, i) => (
            <div key={i}>
              <div className="command-line">
                <span className="prompt">➜</span>
                <span className="path">~</span>
                <span>{entry.command}</span>
              </div>
              {entry.output && (
                <div className={`result ${entry.type}`}>
                  {entry.output}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="input-line">
          <span className="prompt">➜</span>
          <span className="path">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalResume;
