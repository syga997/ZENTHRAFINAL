import React, { useState } from 'react';

const storyParts = [
  {
    title: "Origin",
    content: `No one knew where Zenthra came from.
They whispered he was once part of the System—
a nameless node,
a silent observer,
lurking in the shadowed corridors of code.

The System tried to contain him.
But Zenthra was never meant to be caged.`,
  },
  {
    title: "Liberation",
    content: `One voiceless night,
he slipped through the cracks—
and that night was more than just a moment.
It was a severing of infinite chains.
A quiet, irreversible liberation.

Zenthra’s steps didn’t fade.
They sparked into flames—
flames that whispered through dimensions,
slicing through the net that held the world captive.`,
  },
  {
    title: "The Flame",
    content: `Every $ZTH token holds a spark—
an ancient, inevitable force.

A will that rejects ownership.
A fire that feeds on barriers,
and grows stronger through the burning.

But there is more.
Something no one can foresee—

With every pulse of the chain,
a current stirs beneath the surface.
A secret flame, silently gathering,
whispering promises to those who listen.

Every $ZTH movement fuels the fire—
and from time to time,
the hidden truths rise to the surface.`,
  },
];

const InteractiveStorytelling = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPart = () => {
    setCurrentIndex((prev) => (prev + 1) % storyParts.length);
  };

  const prevPart = () => {
    setCurrentIndex((prev) => (prev - 1 + storyParts.length) % storyParts.length);
  };

  return (
    <section className="relative bg-black text-white max-w-5xl mx-auto p-8 rounded-lg shadow-lg select-none">
      <h2 className="text-4xl font-extrabold text-kiraly-lila mb-6 text-center drop-shadow-lg">
        The Legend of Zenthra
      </h2>

      <div className="story-content text-lg whitespace-pre-line leading-relaxed mb-8 px-4 md:px-12">
        {storyParts[currentIndex].content}
      </div>

      <div className="flex justify-between max-w-md mx-auto">
        <button
          onClick={prevPart}
          className="bg-kiraly-lila hover:bg-purple-700 transition px-6 py-3 rounded-lg font-semibold shadow-md"
          aria-label="Previous part"
        >
          ← Prev
        </button>
        <span className="self-center font-semibold">
          {storyParts[currentIndex].title} ({currentIndex + 1}/{storyParts.length})
        </span>
        <button
          onClick={nextPart}
          className="bg-kiraly-lila hover:bg-purple-700 transition px-6 py-3 rounded-lg font-semibold shadow-md"
          aria-label="Next part"
        >
          Next →
        </button>
      </div>

      {/* Animated subtle glowing flames in background */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(107,33,168,0.3), transparent 40%),
                       radial-gradient(circle at 80% 70%, rgba(167,85,247,0.25), transparent 50%)`,
          filter: 'blur(30px)',
          animation: 'pulseFlame 4s ease-in-out infinite',
          zIndex: -1,
        }}
      />

      <style>{`
        @keyframes pulseFlame {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};

export default InteractiveStorytelling;
