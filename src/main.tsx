import React from "react";

// Komponensek importálása
import HeroSection from "./components/HeroSection";
import BuySection from "./components/BuySection";
import InteractiveStorytelling from "./components/InteractiveStorytelling";
import Presale from "./components/Presale";
import Roadmap from "./components/Roadmap";
import TokenomicsChart from "./components/TokenomicsChart";
import MultiChainSection from "./components/MultiChainSection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <HeroSection />
      <BuySection />
      <InteractiveStorytelling />
      <Presale />
      <Roadmap />
      <TokenomicsChart />
      <MultiChainSection />
      <Footer />
    </>
  );
};

export default App;
