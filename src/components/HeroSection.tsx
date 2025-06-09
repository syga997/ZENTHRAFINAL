import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-antracit to-black text-white px-6">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-kiraly-lila drop-shadow-lg">
        ZENTHRA
      </h1>
      <p className="max-w-xl text-center text-lg mb-8">
        <span className="font-semibold text-kiraly-lila">The Unstoppable Flame</span> <br />
        A multi-chain crypto revolution fueled by relentless token burn and unstoppable growth.
      </p>
      <button className="px-8 py-3 rounded-lg bg-kiraly-lila hover:bg-purple-700 transition duration-300 font-semibold shadow-lg">
        Connect Wallet & Buy Now
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-60 animate-pulse-fast text-sm">
        Presale ends in: <span id="countdown">00:00:00</span>
      </div>
    </section>
  );
};

export default HeroSection;
