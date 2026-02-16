'use client';

import { useState, useEffect, useRef } from 'react';
import { GooeyToaster } from 'gooey-ui';
import type { GooeyToasterProps } from 'gooey-ui';
import { SiteHeader } from './components/site-header';
import { HeroSection } from './components/hero-section';
import { ExamplesSection } from './components/examples-section';
import { BuilderSection } from './components/builder-section';
import { DocsSection } from './components/docs-section';

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [heroLanding, setHeroLanding] = useState(false);
  const [bPosition, setBPosition] = useState<GooeyToasterProps['position']>('top-left');
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const prevHeroVisible = useRef(true);

  // Watch hero title visibility for header transform
  useEffect(() => {
    if (!heroTitleRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '-56px 0px 0px 0px' },
    );
    observer.observe(heroTitleRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger landing animation when hero reappears (scrolling back up)
  useEffect(() => {
    if (heroVisible && !prevHeroVisible.current) {
      setHeroLanding(true);
      const timer = setTimeout(() => setHeroLanding(false), 500);
      return () => clearTimeout(timer);
    }
    prevHeroVisible.current = heroVisible;
  }, [heroVisible]);

  return (
    <>
      <GooeyToaster position={bPosition} />
      <SiteHeader heroVisible={heroVisible} />
      <div className="site-container">
        <HeroSection heroTitleRef={heroTitleRef} heroLanding={heroLanding} />

        <div className="two-col" id="examples">
          <ExamplesSection />
          <BuilderSection position={bPosition} onPositionChange={setBPosition} />
        </div>

        <DocsSection />
      </div>
    </>
  );
}
