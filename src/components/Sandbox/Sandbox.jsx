'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { RefreshCw, Play, Code2, Monitor } from 'lucide-react';
import './Sandbox.scss';

const DEFAULT_CODE = `import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      textAlign: 'center', 
      padding: '50px',
      color: '#333',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Hello, Sandbox! 🚀
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        This is a live React environment. Try editing the code!
      </p>
      
      <div style={{ 
        padding: '20px', 
        background: 'white', 
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 15px 0' }}>Counter: {count}</h2>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#0056b3'}
          onMouseOut={(e) => e.target.style.background = '#007bff'}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`;

const Sandbox = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);

  // Function to generate the HTML for the iframe
  const generateSrcDoc = (codeToRun) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sandbox Preview</title>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="importmap">
          {
            "imports": {
              "react": "https://esm.sh/react@18.2.0",
              "react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
            }
          }
        </script>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; }
          #root { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel" data-type="module">
          ${codeToRun}
        </script>
        <script>
          window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({ type: 'ERROR', message }, '*');
          };
        </script>
      </body>
      </html>
    `;
  };

  const handleRun = useCallback(() => {
    setIsCompiling(true);
    setError(null);
    
    // Small delay to simulate compilation and allow UI to update
    setTimeout(() => {
      setOutput(generateSrcDoc(code));
      setIsCompiling(false);
    }, 500);
  }, [code]);

  // Auto-run on mount
  useEffect(() => {
    handleRun();
  }, []);

  // Listen for errors from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'ERROR') {
        setError(event.data.message);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="sandbox-container">
      <div className="sandbox-header">
        <div className="header-left">
          <Code2 size={24} className="text-blue-400" />
          <h1>Live Project Sandbox</h1>
        </div>
        <div className="header-controls">
          <button 
            className={`run-btn ${isCompiling ? 'loading' : ''}`} 
            onClick={handleRun}
            disabled={isCompiling}
          >
            {isCompiling ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
            <span>{isCompiling ? 'Compiling...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      <div className="sandbox-workspace">
        {/* Editor Panel */}
        <div className="panel editor-panel">
          <div className="panel-header">
            <span>Editor</span>
            <span className="lang-badge">React / JSX</span>
          </div>
          <div className="editor-wrapper">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="panel preview-panel">
          <div className="panel-header">
            <Monitor size={16} />
            <span>Live Preview</span>
          </div>
          <div className="preview-wrapper">
            {error ? (
              <div className="error-overlay">
                <h3>Runtime Error</h3>
                <pre>{error}</pre>
              </div>
            ) : (
              <iframe
                title="sandbox-preview"
                srcDoc={output}
                sandbox="allow-scripts allow-same-origin"
                className="preview-frame"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
