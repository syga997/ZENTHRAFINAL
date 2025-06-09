import React from 'react';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import TokenomicsChart from './components/TokenomicsChart';
import Roadmap from './components/Roadmap';
import BuySection from './components/BuySection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="font-sans bg-black text-white">
      <HeroSection />
      <BuySection />
      <StorySection />
      <TokenomicsChart />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default App;
