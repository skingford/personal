import React from 'react';
import SmartNav from '@/components/SmartNav/SmartNav';

export const metadata = {
  title: 'Smart Navigation | My Portfolio',
  description: 'Intelligent workbench and technical dashboard.',
};

export default function SmartNavPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f172a',
      color: '#e2e8f0',
      paddingTop: '80px' // Space for navbar
    }}>
      <SmartNav />
    </div>
  );
}
