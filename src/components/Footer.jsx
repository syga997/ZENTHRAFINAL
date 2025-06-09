// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import { FaTwitter, FaTelegramPlane, FaDiscord, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Szlogen */}
        <div className="footer-logo-section">
          <h2 className="footer-logo">Zenthra</h2>
          <p className="footer-tagline">
            Igniting the future, burning barriers.
          </p>
        </div>

        {/* Navigáció */}
        <nav className="footer-nav">
          <a href="#hero">Home</a>
          <a href="#presale">Presale</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#storytelling">Story</a>
          <a href="#buy">Buy</a>
          <a href="#support">Support</a>
        </nav>

        {/* Jog & Kapcsolat + Social */}
        <div className="footer-info-social">
          <p>© 2025 Zenthra. All rights reserved.</p>
          <p>
            Contact: <a href="mailto:support@zenthra.io">support@zenthra.io</a>
          </p>
          <div className="footer-social-icons">
            <a href="https://twitter.com/zenthra" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://t.me/zenthra" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <FaTelegramPlane />
            </a>
            <a href="https://discord.gg/zenthra" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FaDiscord />
            </a>
            <a href="https://github.com/zenthra" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
