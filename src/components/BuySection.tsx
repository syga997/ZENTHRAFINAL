import React, { useState, useEffect } from 'react';

const BuySection = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedChain, setSelectedChain] = useState('solana');
  const [amount, setAmount] = useState('');
  const [isBuying, setIsBuying] = useState(false);
  const [message, setMessage] = useState('');

  const chains = [
    { id: 'solana', name: 'Solana' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'base', name: 'Base' },
    { id: 'bsc', name: 'BSC' },
  ];

  // Dummy connect wallet function
  const connectWallet = () => {
    setWalletConnected(true);
    setMessage('Wallet connected!');
  };

  // Dummy buy function
  const handleBuy = () => {
    if (!amount || Number(amount) <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }
    setIsBuying(true);
    setMessage('Processing your purchase...');
    setTimeout(() => {
      setIsBuying(false);
      setMessage(`Successfully bought ${amount} $ZTH on ${selectedChain}`);
      setAmount('');
    }, 2000);
  };

  return (
    <section className="bg-antracit py-12 px-6 max-w-4xl mx-auto rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-kiraly-lila">Buy $ZTH Token</h2>

      {!walletConnected ? (
        <button
          onClick={connectWallet}
          className="bg-kiraly-lila px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold shadow-md"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <label className="block mb-2 font-semibold">Select Blockchain</label>
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black text-white border border-kiraly-lila"
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black text-white border border-kiraly-lila"
            min="0"
          />

          <button
            onClick={handleBuy}
            disabled={isBuying}
            className="bg-kiraly-lila px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold shadow-md w-full"
          >
            {isBuying ? 'Processing...' : 'Buy Now'}
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </>
      )}
    </section>
  );
};

export default BuySection;
