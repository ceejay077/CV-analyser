import React, { useState } from 'react';
import './Header.css';

export default function Header({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = (p) => { onNavigate(p); setMenuOpen(false); };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => nav('home')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">◈</span>
          <span className="logo-text">CV Analyser</span>
        </div>
        <nav className="nav desktop-nav">
          <button onClick={() => nav('home')}>Analyzer</button>
          <button onClick={() => nav('how')}>How it works</button>
          <button onClick={() => nav('privacy')}>Privacy</button>
          <button onClick={() => nav('terms')}>Terms</button>
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => nav('home')}>Analyzer</button>
          <button onClick={() => nav('how')}>How it works</button>
          <button onClick={() => nav('privacy')}>Privacy</button>
          <button onClick={() => nav('terms')}>Terms</button>
        </div>
      )}
    </header>
  );
}
