import React from 'react';

import CTA from '../../components/CTA';
import Quote from '../../components/Quote';
import Hero from '../../components/Hero';
import Features from '../../components/Features';

export default function Landing(): React.ReactNode {
  return (
    <>
      <Hero />

      <Features />

      <Quote />

      <CTA />
    </>
  );
}
