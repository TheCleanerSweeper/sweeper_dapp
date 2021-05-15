import React from 'react';

const Hero: React.FunctionComponent = () => {
  return (
    <div className="relative bg-indigo-800 py-40 bg-fixed">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover blur-sm filter bg-fixed"
          src="https://images.unsplash.com/photo-1572123979839-3749e9973aba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
          alt=""
        />
        <div className="absolute inset-0 bg-indigo-800 " style={{ mixBlendMode: 'multiply' }} aria-hidden="true" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Sweeping Up Rug Pulls
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Got rugged? SweeperDAO is here to clean up. Burn your rug pulled tokens for $SWEEP.
        </p>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Give me your shitcoins, your rugs, your moonbois yearning for takeoff.
        </p>
      </div>
    </div>
  );
};

export default Hero;
