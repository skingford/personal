'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { RefreshCw, Play, Code2, Monitor, Terminal, ChevronDown } from 'lucide-react';
import './Sandbox.scss';

const LANGUAGES = {
  react: {
    name: 'React',
    type: 'frontend',
    icon: '⚛️',
    defaultCode: `import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = React.useState(0);

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
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          background: '#61dafb',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  },
  vue: {
    name: 'Vue',
    type: 'frontend',
    icon: '💚',
    defaultCode: `<div id="app">
  <div style="text-align: center; padding: 50px; font-family: system-ui;">
    <h1>Vue Counter 💚</h1>
    <h2 style="font-size: 4rem; margin: 20px 0;">{{ count }}</h2>
    <button 
      @click="count++"
      style="padding: 10px 20px; font-size: 1.2rem; background: #42b883; color: white; border: none; border-radius: 8px; cursor: pointer;"
    >
      Increment
    </button>
  </div>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(0);
    return { count };
  }
}).mount('#app');
</script>`
  },
  angular: {
    name: 'Angular',
    type: 'frontend',
    icon: '🅰️',
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
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.count = 0;
  $scope.increment = function() {
    $scope.count++;
  };
});
</script>`
  },
  python: {
    name: 'Python',
    type: 'backend',
    icon: '🐍',
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
    icon: '🟢',
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
    icon: '🐹',
    pistonLang: 'go',
    pistonVer: '1.19.0',
    defaultCode: `package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Hello from Go! 🐹")
	fmt.Println("Current time:", time.Now().Format(time.RFC822))
	
	c := make(chan string)
	go func() {
		time.Sleep(1 * time.Second)
		c <- "Async operation complete!"
	}()
	
	msg := <-c
	fmt.Println(msg)
}`
  },
  rust: {
    name: 'Rust',
    type: 'backend',
    icon: '🦀',
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

  const currentLangConfig = LANGUAGES[activeLang];

  const handleLanguageChange = (langKey) => {
    setActiveLang(langKey);
    setCode(LANGUAGES[langKey].defaultCode);
    setOutput('');
    setTerminalOutput('');
    setIsLangMenuOpen(false);
  };

  const runFrontend = () => {
    let htmlContent = '';
    
    if (activeLang === 'react') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script type="importmap">
            { "imports": { "react": "https://esm.sh/react@18.2.0", "react-dom/client": "https://esm.sh/react-dom@18.2.0/client" } }
          </script>
          <style>body { margin: 0; }</style>
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
          <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
          <style>body { margin: 0; }</style>
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
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
          <style>body { margin: 0; }</style>
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
        setTerminalOutput(data.run.output || 'No output');
      } else {
        setTerminalOutput('Error: Failed to execute code');
      }
    } catch (err) {
      setTerminalOutput('Error: ' + err.message);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleRun = useCallback(() => {
    setIsCompiling(true);
    if (currentLangConfig.type === 'frontend') {
      setTimeout(runFrontend, 500);
    } else {
      runBackend();
    }
  }, [code, activeLang, currentLangConfig]);

  // Auto-run frontend on mount
  useEffect(() => {
    if (currentLangConfig.type === 'frontend') {
      handleRun();
    }
  }, []);

  return (
    <div className="sandbox-container">
      <div className="sandbox-header">
        <div className="header-left">
          <Code2 size={24} className="text-blue-400" />
          <h1>Live Project Sandbox</h1>
          
          <div className="lang-selector-wrapper">
            <button 
              className="lang-selector-btn"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <span className="lang-icon">{currentLangConfig.icon}</span>
              {currentLangConfig.name}
              <ChevronDown size={14} />
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
          <button 
            className={`run-btn ${isCompiling ? 'loading' : ''}`} 
            onClick={handleRun}
            disabled={isCompiling}
          >
            {isCompiling ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
            <span>Run Code</span>
          </button>
        </div>
      </div>

      <div className="sandbox-workspace">
        <div className="panel editor-panel">
          <div className="panel-header">
            <span>Editor</span>
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
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        <div className="panel preview-panel">
          <div className="panel-header">
            {currentLangConfig.type === 'frontend' ? <Monitor size={16} /> : <Terminal size={16} />}
            <span>{currentLangConfig.type === 'frontend' ? 'Live Preview' : 'Terminal Output'}</span>
          </div>
          <div className="preview-wrapper">
            {currentLangConfig.type === 'frontend' ? (
              <iframe
                title="sandbox-preview"
                srcDoc={output}
                sandbox="allow-scripts allow-same-origin"
                className="preview-frame"
              />
            ) : (
              <div className="terminal-output">
                <pre>{terminalOutput || 'Waiting for output...'}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
