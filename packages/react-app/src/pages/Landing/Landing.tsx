import React from 'react';

import CTA from '../../components/landing/CTA';
import Quote from '../../components/landing/Quote';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';

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
