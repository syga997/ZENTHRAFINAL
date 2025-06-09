import React, { useState } from 'react';
import './MultichainSection.css';

const chains = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: '/assets/chains/eth.svg',
    description: 'The world’s leading smart contract platform.',
    color: '#627EEA',
  },
  {
    id: 'solana',
    name: 'Solana',
    logo: '/assets/chains/solana.svg',
    description: 'High-speed and low-cost blockchain.',
    color: '#00FFA3',
  },
  {
    id: 'bsc',
    name: 'Binance Smart Chain',
    logo: '/assets/chains/bsc.svg',
    description: 'Fast and secure blockchain by Binance.',
    color: '#F0B90B',
  },
  {
    id: 'base',
    name: 'Base',
    logo: '/assets/chains/base.svg',
    description: 'Ethereum Layer 2 scaling solution by Coinbase.',
    color: '#0052FF',
  },
];

export default function MultichainSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="multichain-section" id="multichain">
      <h2 className="section-title">Multi-Chain Network</h2>
      <div className="chains-container">
        {chains.map((chain) => (
          <div
            key={chain.id}
            className={`chain-card ${hovered === chain.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHovered(chain.id)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(chain.id)}
            onTouchEnd={() => setHovered(null)}
            style={{ '--chain-color': chain.color }}
          >
            <img src={chain.logo} alt={`${chain.name} logo`} className="chain-logo" />
            <div className="tooltip">{chain.description}</div>
          </div>
        ))}
      </div>
      <div className={`connecting-light ${hovered ? 'active' : ''}`} />
    </section>
  );
}
