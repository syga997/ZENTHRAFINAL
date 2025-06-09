import React from 'react';
import './MultiChainSection.css';
import ethLogo from '../../assets/chains/eth.svg';
import solanaLogo from '../../assets/chains/solana.svg';
import bscLogo from '../../assets/chains/bsc.svg';
import baseLogo from '../../assets/chains/base.svg';

const chains = [
  { name: 'Ethereum', logo: ethLogo },
  { name: 'Solana', logo: solanaLogo },
  { name: 'BSC', logo: bscLogo },
  { name: 'Base', logo: baseLogo }
];

const MultiChainSection = () => {
  return (
    <section className="multi-chain-section">
      <h2 className="multi-title">ZTH is Multi-Chain by Design</h2>
      <div className="orbit-container">
        <div className="center-core">ZTH</div>
        {chains.map((chain, index) => (
          <div key={index} className={`orbit orbit-${index}`}>
            <img src={chain.logo} alt={chain.name} className="chain-logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MultiChainSection;
