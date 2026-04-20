import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">CV Analyser</span>
        </div>
        <nav className="nav">
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
