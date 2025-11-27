'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDebug } from '@/context/DebugContext';
import './DebugLogs.scss';

const DebugLogs = () => {
  const { isDebug } = useDebug();
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (!isDebug) return;

    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const endpoints = [
      '/api/v1/user', 
      '/api/v1/projects', 
      '/api/v1/analytics', 
      '/api/v1/status',
      '/_next/static/chunks/main.js',
      '/assets/images/hero.png'
    ];
    const statusCodes = [200, 201, 204, 304, 401, 404, 500];

    const addLog = () => {
      const method = methods[Math.floor(Math.random() * methods.length)];
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const status = statusCodes[Math.floor(Math.random() * statusCodes.length)];
      const time = new Date().toISOString().split('T')[1].slice(0, -1);
      const latency = Math.floor(Math.random() * 200) + 20;

      const newLog = {
        id: Date.now(),
        timestamp: time,
        method,
        endpoint,
        status,
        latency
      };

      setLogs(prev => [...prev.slice(-20), newLog]);
    };

    const interval = setInterval(addLog, 2000);
    addLog(); // Initial log

    return () => clearInterval(interval);
  }, [isDebug]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!isDebug) return null;

  return (
    <div className="debug-logs">
      <div className="logs-header">NETWORK ACTIVITY</div>
      <div className="logs-container">
        {logs.map(log => (
          <div key={log.id} className="log-entry">
            <span className="log-time">[{log.timestamp}]</span>
            <span className={`log-method ${log.method}`}>{log.method}</span>
            <span className="log-endpoint">{log.endpoint}</span>
            <span className={`log-status s-${Math.floor(log.status / 100)}xx`}>{log.status}</span>
            <span className="log-latency">{log.latency}ms</span>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default DebugLogs;
