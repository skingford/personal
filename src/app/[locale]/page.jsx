import React from 'react';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import LiveStack from '@/components/LiveStack/LiveStack';
import Projects from '@/components/Projects/Projects';
import Contact from '@/components/Contact/Contact';

import FloatingNav from '@/components/FloatingNav/FloatingNav';

export const metadata = {
  title: 'Home | My Portfolio',
  description: 'Welcome to my personal portfolio website.',
};

export default function Home() {
  return (
    <>
      <FloatingNav />
      <Hero />
      <About />
      <LiveStack />
      <Projects />
      <Contact />
    </>
  );
}
