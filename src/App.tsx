import React from "react";

import HeroSection from "./components/HeroSection";
import BuySection from "./components/BuySection";
import InteractiveStorytelling from "./components/InteractiveStorytelling";
import MultiChainSection from "./components/MultiChainSection";
import Presale from "./components/Presale";
import Roadmap from "./components/Roadmap";
import TokenomicsChart from "./components/TokenomicsChart";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <HeroSection />
      <BuySection />
      <InteractiveStorytelling />
      <MultiChainSection />
      <Presale />
      <Roadmap />
      <TokenomicsChart />
      <Footer />
    </>
  );
}
