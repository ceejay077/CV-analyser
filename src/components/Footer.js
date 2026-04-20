import React from 'react';
import './Footer.css';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">◈ CV Analyser</span>
        <span className="footer-copy">Free AI Resume Analysis · Powered by Groq AI</span>
        <div className="footer-links">
          <button onClick={() => onNavigate('privacy')}>Privacy</button>
          <button onClick={() => onNavigate('terms')}>Terms</button>
          <button onClick={() => onNavigate('how')}>How it works</button>
        </div>
      </div>
    </footer>
  );
}
