'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { RefreshCw, Play, Monitor, Terminal, ChevronDown, Code, Layout, Trash2 } from 'lucide-react';
import { ReactLogo, VueLogo, AngularLogo, PythonLogo, NodeLogo, GoLogo, RustLogo } from './Icons';
import './Sandbox.scss';

const LANGUAGES = {
  react: {
    name: 'React',
    type: 'frontend',
    icon: <ReactLogo />,
    defaultCode: `import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);

  const handleClick = () => {
    setCount(c => c + 1);
    console.log('Count updated:', count + 1);
  };

  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      textAlign: 'center', 
      padding: '50px',
      color: '#333',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <h1>React Counter ⚛️</h1>
      <h2 style={{ fontSize: '4rem', margin: '20px 0' }}>{count}</h2>
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          background: '#61dafb',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.1s'
        }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Increment
      </button>
      <p style={{ marginTop: '20px', color: '#666' }}>Check the Console tab for logs!</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  },
  vue: {
    name: 'Vue',
    type: 'frontend',
    icon: <VueLogo />,
    defaultCode: `<div id="app">
  <div style="text-align: center; padding: 50px; font-family: system-ui;">
    <h1>Vue Counter 💚</h1>
    <h2 style="font-size: 4rem; margin: 20px 0;">{{ count }}</h2>
    <button 
      @click="increment"
      style="padding: 10px 20px; font-size: 1.2rem; background: #42b883; color: white; border: none; border-radius: 8px; cursor: pointer;"
    >
      Increment
    </button>
    <p style="margin-top: 20px; color: #666">Check the Console tab for logs!</p>
  </div>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
      console.log('Vue count:', count.value);
    };
    return { count, increment };
  }
}).mount('#app');
</script>`
  },
  angular: {
    name: 'Angular',
    type: 'frontend',
    icon: <AngularLogo />,
    defaultCode: `<!-- Angular requires a complex build step. 
     For this demo, we use a simplified template approach. -->
<div ng-app="myApp" ng-controller="myCtrl" style="text-align: center; padding: 50px; font-family: system-ui;">
  <h1>AngularJS Counter 🅰️</h1>
  <h2 style="font-size: 4rem; margin: 20px 0;">{{ count }}</h2>
  <button 
    ng-click="increment()"
    style="padding: 10px 20px; font-size: 1.2rem; background: #dd0031; color: white; border: none; border-radius: 8px; cursor: pointer;"
  >
    Increment
  </button>
  <p style="margin-top: 20px; color: #666">Check the Console tab for logs!</p>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.count = 0;
  $scope.increment = function() {
    $scope.count++;
    console.log('Angular count:', $scope.count);
  };
});
</script>`
  },
  python: {
    name: 'Python',
    type: 'backend',
    icon: <PythonLogo />,
    pistonLang: 'python',
    pistonVer: '3.10.0',
    defaultCode: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print("Generating Fibonacci Sequence:")
for i in range(10):
    print(f"Fib({i}) = {fibonacci(i)}")`
  },
  javascript: {
    name: 'Node.js',
    type: 'backend',
    icon: <NodeLogo />,
    pistonLang: 'javascript',
    pistonVer: '18.15.0',
    defaultCode: `const os = require('os');

console.log("Running on Node.js " + process.version);
console.log("Platform: " + os.platform());

const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);

console.log("\\nSquared numbers:", squared);`
  },
  go: {
    name: 'Go',
    type: 'backend',
    icon: <GoLogo />,
    pistonLang: 'go',
    pistonVer: '1.16.2',
    defaultCode: `package main

import "fmt"

func main() {
\tfmt.Println("Hello from Go! 🐹")
\t
\tnumbers := []int{1, 2, 3, 4, 5}
\tsum := 0
\tfor _, num := range numbers {
\t\tsum += num
\t}
\t
\tfmt.Printf("Numbers: %v\\n", numbers)
\tfmt.Printf("Sum: %d\\n", sum)
}`
  },
  rust: {
    name: 'Rust',
    type: 'backend',
    icon: <RustLogo />,
    pistonLang: 'rust',
    pistonVer: '1.68.2',
    defaultCode: `fn main() {
    println!("Hello from Rust! 🦀");
    
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    
    println!("Sum of {:?} is {}", numbers, sum);
}`
  }
};

const Sandbox = () => {
  const [activeLang, setActiveLang] = useState('react');
  const [code, setCode] = useState(LANGUAGES.react.defaultCode);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'console'
  const [editorWidth, setEditorWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const currentLangConfig = LANGUAGES[activeLang];

  const handleLanguageChange = (langKey) => {
    setActiveLang(langKey);
    setCode(LANGUAGES[langKey].defaultCode);
    setOutput('');
    setTerminalOutput('');
    setConsoleLogs([]);
    setIsLangMenuOpen(false);
    // Switch to preview tab for frontend, console for backend
    setActiveTab(LANGUAGES[langKey].type === 'frontend' ? 'preview' : 'console');
  };

  const runFrontend = () => {
    setConsoleLogs([]); // Clear logs on run
    let htmlContent = '';
    
    const consoleScript = `
      <script>
        (function() {
          const oldLog = console.log;
          const oldError = console.error;
          const oldWarn = console.warn;
          const oldInfo = console.info;
          
          function sendLog(type, args) {
            try {
              const serializedArgs = args.map(arg => {
                if (typeof arg === 'object') {
                  try {
                    return JSON.stringify(arg);
                  } catch(e) {
                    return arg.toString();
                  }
                }
                return String(arg);
              });
              window.parent.postMessage({ type: 'sandbox-console', level: type, args: serializedArgs }, '*');
            } catch(e) {
              // Ignore serialization errors
            }
          }

          console.log = function(...args) { oldLog.apply(console, args); sendLog('log', args); };
          console.error = function(...args) { oldError.apply(console, args); sendLog('error', args); };
          console.warn = function(...args) { oldWarn.apply(console, args); sendLog('warn', args); };
          console.info = function(...args) { oldInfo.apply(console, args); sendLog('info', args); };
          
          window.onerror = function(msg, url, line) {
            sendLog('error', [msg]);
          };
        })();
      </script>
    `;
    
    if (activeLang === 'react') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          ${consoleScript}
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script type="importmap">
            { "imports": { "react": "https://esm.sh/react@18.2.0", "react-dom/client": "https://esm.sh/react-dom@18.2.0/client" } }
          </script>
          <style>body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }</style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel" data-type="module">${code}</script>
        </body>
        </html>`;
    } else if (activeLang === 'vue') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          ${consoleScript}
          <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
          <style>body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }</style>
        </head>
        <body>
          ${code}
        </body>
        </html>`;
    } else if (activeLang === 'angular') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          ${consoleScript}
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
          <style>body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }</style>
        </head>
        <body>
          ${code}
        </body>
        </html>`;
    }

    setOutput(htmlContent);
    setIsCompiling(false);
  };

  const runBackend = async () => {
    setTerminalOutput('Running...');
    setConsoleLogs([]); // Clear logs
    setActiveTab('console'); // Switch to console for backend
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: currentLangConfig.pistonLang,
          version: currentLangConfig.pistonVer,
          files: [{ content: code }]
        })
      });
      
      const data = await response.json();
      
      if (data.run) {
        const output = data.run.output || '';
        const stderr = data.run.stderr || '';
        const combinedOutput = stderr ? `${output}\n\nErrors:\n${stderr}` : output;
        setTerminalOutput(combinedOutput || 'No output');
      } else if (data.message) {
        setTerminalOutput(`Error: ${data.message}`);
      } else {
        setTerminalOutput('Error: Failed to execute code. Please check your syntax.');
      }
    } catch (err) {
      setTerminalOutput(`Network Error: ${err.message}\n\nPlease check your internet connection.`);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleRun = useCallback(() => {
    setIsCompiling(true);
    if (currentLangConfig.type === 'frontend') {
      // Small delay to show loading state
      setTimeout(runFrontend, 300);
    } else {
      runBackend();
    }
  }, [code, activeLang, currentLangConfig]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun]);

  // Handle console messages from iframe
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'sandbox-console') {
        setConsoleLogs(prev => [...prev, {
          level: e.data.level,
          args: e.data.args,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run frontend on mount
  useEffect(() => {
    if (currentLangConfig.type === 'frontend') {
      handleRun();
    }
  }, []);

  // Resizing logic
  const startResizing = useCallback(() => {
    setIsDragging(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resize = useCallback((e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setEditorWidth(newWidth);
      }
    }
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Add command for Ctrl+Enter
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });
  };

  return (
    <div className="sandbox-container">
      <div className="sandbox-header">
        <div className="header-left">
          <div className="lang-icon-large">{currentLangConfig.icon}</div>
          <div className="header-title-group">
            <h1>Project Sandbox</h1>
            <span className="subtitle">Interactive Code Playground</span>
          </div>
          
          <div className="lang-selector-wrapper">
            <button 
              className={`lang-selector-btn ${isLangMenuOpen ? 'active' : ''}`}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <span className="lang-icon">{currentLangConfig.icon}</span>
              {currentLangConfig.name}
              <ChevronDown size={14} className={`chevron ${isLangMenuOpen ? 'rotate' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <div className="lang-dropdown">
                {Object.entries(LANGUAGES).map(([key, config]) => (
                  <button
                    key={key}
                    className={`lang-option ${activeLang === key ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(key)}
                  >
                    <span className="lang-icon">{config.icon}</span>
                    {config.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="header-controls">
          <div className="shortcut-hint">
            <span className="key">⌘</span> + <span className="key">Enter</span> to run
          </div>
          <button 
            className={`run-btn ${isCompiling ? 'loading' : ''}`} 
            onClick={handleRun}
            disabled={isCompiling}
          >
            {isCompiling ? <RefreshCw className="spin" size={18} /> : <Play size={18} fill="currentColor" />}
            <span>Run Code</span>
          </button>
        </div>
      </div>

      <div 
        className={`sandbox-workspace ${isDragging ? 'dragging' : ''}`} 
        ref={containerRef}
      >
        <div className="panel editor-panel" style={{ width: `${editorWidth}%` }}>
          <div className="panel-header">
            <div className="panel-title">
              <Code size={16} />
              <span>Editor</span>
            </div>
            <span className="lang-badge">{activeLang.toUpperCase()}</span>
          </div>
          <div className="editor-wrapper">
            <Editor
              height="100%"
              defaultLanguage={activeLang === 'react' ? 'javascript' : activeLang}
              language={activeLang === 'react' || activeLang === 'vue' || activeLang === 'angular' ? 'html' : activeLang}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                fontLigatures: true,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
              }}
            />
          </div>
        </div>

        <div 
          className="resizer" 
          onMouseDown={startResizing}
          title="Drag to resize"
        >
          <div className="resizer-handle" />
        </div>

        <div className="panel preview-panel" style={{ width: `${100 - editorWidth}%` }}>
          <div className="panel-header tabs-header">
            <div className="tabs-left">
              <button 
                className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                <Monitor size={16} />
                <span>Preview</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'console' ? 'active' : ''}`}
                onClick={() => setActiveTab('console')}
              >
                <Terminal size={16} />
                <span>Console</span>
                {consoleLogs.length > 0 && <span className="badge">{consoleLogs.length}</span>}
              </button>
            </div>
            {activeTab === 'console' && (
              <button className="clear-btn" onClick={() => { setConsoleLogs([]); setTerminalOutput(''); }} title="Clear Console">
                <Trash2 size={14} />
              </button>
            )}
          </div>
          
          <div className="preview-wrapper">
            <div className={`tab-content ${activeTab === 'preview' ? 'active' : ''}`}>
              {currentLangConfig.type === 'frontend' ? (
                <iframe
                  title="sandbox-preview"
                  srcDoc={output}
                  sandbox="allow-scripts allow-same-origin"
                  className="preview-frame"
                />
              ) : (
                <div className="backend-placeholder">
                  <Terminal size={48} className="placeholder-icon" />
                  <p>Backend code output is shown in the Console tab</p>
                  <button className="view-console-btn" onClick={() => setActiveTab('console')}>
                    View Output
                  </button>
                </div>
              )}
            </div>

            <div className={`tab-content console-content ${activeTab === 'console' ? 'active' : ''}`}>
              {currentLangConfig.type === 'backend' && terminalOutput && (
                <div className="terminal-block">
                  <div className="log-entry system">
                    <span className="log-prefix">{'>'}</span>
                    <pre>{terminalOutput}</pre>
                  </div>
                </div>
              )}
              
              {consoleLogs.map((log, index) => (
                <div key={index} className={`log-entry ${log.level}`}>
                  <span className="log-time">{log.timestamp}</span>
                  <span className="log-content">
                    {log.args.join(' ')}
                  </span>
                </div>
              ))}
              
              {consoleLogs.length === 0 && !terminalOutput && (
                <div className="empty-state">
                  <span>No output to display</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
