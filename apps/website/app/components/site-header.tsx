'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GithubIcon, NpmIcon, MenuIcon, CloseIcon } from './icons';

interface SiteHeaderProps {
  heroVisible: boolean;
  currentPage?: 'home' | 'changelog';
}

export function SiteHeader({ heroVisible, currentPage = 'home' }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header${!heroVisible && currentPage === 'home' ? ' header--hero-hidden' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="header-logo" onClick={() => window.scrollTo(0, 0)}>
          gooey-ui
          <img src="/mascot.png" alt="" className="header-mascot" />
        </Link>

        <nav className="header-nav">
          <button className="nav-link" onClick={() => scrollTo('examples')}>Examples</button>
          <button className="nav-link" onClick={() => scrollTo('builder')}>Builder</button>
          <button className="nav-link" onClick={() => scrollTo('docs')}>Docs</button>
          <Link href="/changelog" className={`nav-link${currentPage === 'changelog' ? ' nav-link--active' : ''}`}>Changelog</Link>
        </nav>

        <div className="header-icons">
          <a href="https://github.com/satyajitghana/gooey-toast" target="_blank" rel="noopener noreferrer" className="header-icon-link" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="https://www.npmjs.com/package/gooey-ui" target="_blank" rel="noopener noreferrer" className="header-icon-link" aria-label="npm">
            <NpmIcon size={18} />
          </a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-link" onClick={() => scrollTo('examples')}>Examples</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('builder')}>Builder</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('docs')}>Docs</button>
          <Link
            href="/changelog"
            className={`mobile-menu-link${currentPage === 'changelog' ? ' mobile-menu-link--active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Changelog
          </Link>
          <div className="mobile-menu-divider" />
          <div className="mobile-menu-icons">
            <a href="https://github.com/satyajitghana/gooey-toast" target="_blank" rel="noopener noreferrer" className="header-icon-link">
              <GithubIcon size={18} /> GitHub
            </a>
            <a href="https://www.npmjs.com/package/gooey-ui" target="_blank" rel="noopener noreferrer" className="header-icon-link">
              <NpmIcon size={18} /> npm
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
