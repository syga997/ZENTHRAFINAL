import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const CHAINS = {
  ethereum: {
    chainId: 1,
    rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_KEY'],
    symbol: 'ETH',
    decimals: 18,
  },
  bsc: {
    chainId: 56,
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    symbol: 'BNB',
    decimals: 18,
  },
  base: {
    chainId: 8453,
    rpcUrls: ['https://mainnet.base.org'],
    symbol: 'ETH',
    decimals: 18,
  },
  solana: {
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  },
};

// Constants for the presale
const TOKEN_PRICE_INITIAL = 0.0005; // initial price in USD (or stablecoin)
const BURN_RATE = 0.03; // 3% burn

const TOTAL_SUPPLY = 150_000_000_000;

// Price increase phases logic
const PHASES = [
  { phase: 1, durationDays: 11, priceStart: 0.0005, priceEnd: 0.00065 },
  { phase: 2, durationDays: 11, priceStart: 0.00065, priceEnd: 0.0008 },
  { phase: 3, durationDays: 8, priceStart: 0.0008, priceEnd: 0.0009 },
  { phase: 4, durationDays: 10, priceStart: 0.0009, priceEnd: 0.001 },
];

function calculateCurrentPrice(startTimestamp: number) {
  const now = Date.now();
  const elapsedMs = now - startTimestamp;
  let dayElapsed = elapsedMs / (1000 * 60 * 60 * 24);

  let accumulatedDays = 0;
  for (const phase of PHASES) {
    if (dayElapsed <= accumulatedDays + phase.durationDays) {
      // interpolate price inside this phase
      const phaseDay = dayElapsed - accumulatedDays;
      const priceDiff = phase.priceEnd - phase.priceStart;
      return phase.priceStart + (priceDiff * (phaseDay / phase.durationDays));
    }
    accumulatedDays += phase.durationDays;
  }
  // After all phases, price stays at last phase end price
  return PHASES[PHASES.length - 1].priceEnd;
}

const Presale = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chain, setChain] = useState<'ethereum' | 'bsc' | 'base' | 'solana' | null>(null);
  const [amountUSD, setAmountUSD] = useState('');
  const [price, setPrice] = useState(TOKEN_PRICE_INITIAL);
  const [tokensToReceive, setTokensToReceive] = useState(0);
  const [presaleStart] = useState(Date.now()); // replace with actual presale start timestamp
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState('');

  // Timer for presale end in 1.5 months = ~45 days
  const presaleDurationMs = PHASES.reduce((acc, p) => acc + p.durationDays * 24 * 3600 * 1000, 0);
  const presaleEnd = presaleStart + presaleDurationMs;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = presaleEnd - now;
      if (diff <= 0) {
        setCountdown('Presale ended');
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${d}d ${h}h ${m}m ${s}s`);
      }
      setPrice(calculateCurrentPrice(presaleStart));
    }, 1000);
    return () => clearInterval(timer);
  }, [presaleStart, presaleEnd]);

  // Calculate tokens to receive after burn
  useEffect(() => {
    const priceNow = calculateCurrentPrice(presaleStart);
    setPrice(priceNow);
    if (!amountUSD) {
      setTokensToReceive(0);
      return;
    }
    const tokensGross = parseFloat(amountUSD) / priceNow;
    const tokensNet = tokensGross * (1 - BURN_RATE);
    setTokensToReceive(tokensNet);
  }, [amountUSD, presaleStart]);

  const connectWallet = async () => {
    setError('');
    try {
      if ((window as any).solana) {
        // Solana wallet connect
        const sol = (window as any).solana;
        if (!sol.isPhantom) {
          setError('Please use Phantom wallet for Solana');
          return;
        }
        const resp = await sol.connect();
        setWalletAddress(resp.publicKey.toString());
        setChain('solana');
        return;
      }

      // For EVM chains, use Web3Modal
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {}, // Add wallet providers here
      });
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // Detect chainId
      const network = await ethersProvider.getNetwork();
      if (network.chainId === CHAINS.ethereum.chainId) setChain('ethereum');
      else if (network.chainId === CHAINS.bsc.chainId) setChain('bsc');
      else if (network.chainId === CHAINS.base.chainId) setChain('base');
      else setChain(null);
    } catch (err) {
      setError('Wallet connection failed');
    }
  };

  const buyTokens = async () => {
    setError('');
    if (!walletAddress || !chain) {
      setError('Please connect your wallet');
      return;
    }
    if (!amountUSD || parseFloat(amountUSD) <= 0) {
      setError('Enter a valid purchase amount');
      return;
    }
    setBuying(true);

    try {
      if (chain === 'solana') {
        const connection = new Connection(CHAINS.solana.rpcUrl, 'confirmed');
        const receiverPubkey = new PublicKey('YOUR_SOLANA_SALE_WALLET_ADDRESS'); // Add real wallet
        const lamports = Math.floor((parseFloat(amountUSD) / price) * 1e9); // Simplified, adjust for SOL price or use USDC

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(walletAddress),
            toPubkey: receiverPubkey,
            lamports,
          })
        );

        const sol = (window as any).solana;
        const { signature } = await sol.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature);

      } else {
        // For EVM chains
        const web3Modal = new Web3Modal();
        const provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();

        // Here we would call the presale smart contract buy function
        // For demo: send native coin to presale wallet (replace with real contract)
        const presaleWalletAddress = 'YOUR_PRESALE_WALLET_ADDRESS'; // Replace with real wallet

        // Convert amountUSD to native token amount (needs oracle or fixed price or external API)
        // Here simplified: assume 1 USD = 1 native coin for demo purposes only, replace in real logic
        const amountInWei = ethers.utils.parseUnits(amountUSD, 'ether');

        const tx = await signer.sendTransaction({
          to: presaleWalletAddress,
          value: amountInWei,
        });

        await tx.wait();
      }
      alert(`Purchase successful! You will receive approximately ${tokensToReceive.toFixed(2)} $ZTH tokens (3% burn applied).`);
      setAmountUSD('');
    } catch (error) {
      setError('Transaction failed. Please try again.');
    }
    setBuying(false);
  };

  // US residents exclusion message
  const isUS = /United States|USA|America/i.test(navigator.language);

  return (
    <section className="max-w-5xl mx-auto p-8 bg-antracit rounded-xl shadow-lg text-white">
      <h2 className="text-4xl font-extrabold mb-6 text-kiraly-lila text-center drop-shadow-lg">Zenthra Presale</h2>
      {isUS && (
        <p className="text-red-500 text-center mb-4 font-semibold">
          Residents of the United States are not permitted to participate in the presale.
        </p>
      )}

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <button
          onClick={connectWallet}
          className="px-8 py-3 rounded-full bg-kiraly-lila hover:bg-purple-800 font-bold transition"
        >
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </button>

        <input
          type="number"
          step="0.01"
          placeholder="Enter USD amount"
          value={amountUSD}
          onChange={(e) => setAmountUSD(e.target.value)}
          className="p-3 rounded-lg text-antracit font-semibold w-64"
          disabled={!walletAddress || buying}
        />

        <button
          onClick={buyTokens}
          disabled={!walletAddress || buying || !amountUSD || parseFloat(amountUSD) <= 0}
          className="px-8 py-3 rounded-full bg-kiraly-lila hover:bg-purple-800 font-bold transition disabled:opacity-50"
        >
          {buying ? 'Processing...' : 'Buy Now'}
        </button>
      </div>

      <p className="mt-6 text-center text-lg font-semibold text-white">
        Current price: <span className="text-kiraly-lila">${price.toFixed(6)}</span> / ZTH
      </p>

      <p className="mt-2 text-center text-white">
        Estimated tokens (after 3% burn): <span className="font-bold">{tokensToReceive.toFixed(2)} ZTH</span>
      </p>

      <p className="mt-8 text-center text-gray-400 italic">
        Presale ends in: <span className="font-semibold">{countdown}</span>
      </p>
    </section>
  );
};

export default Presale;
