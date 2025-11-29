'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Dashboard from '@/components/Dashboard/Dashboard';

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  // Define routes where Navbar/Footer/Dashboard should be hidden
  // We check if the pathname contains these segments
  const hiddenRoutes = ['/jukebox'];
  
  const shouldHide = hiddenRoutes.some(route => pathname.includes(route));

  return (
    <div className="app">
      {!shouldHide && <Navbar />}
      <main>{children}</main>
      {!shouldHide && <Footer />}
      {!shouldHide && <Dashboard />}
    </div>
  );
};

export default ClientLayout;
