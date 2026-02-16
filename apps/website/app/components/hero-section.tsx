import { useCopy } from './use-copy';
import { CopyIcon, CheckIcon } from './icons';

interface HeroSectionProps {
  heroTitleRef: React.RefObject<HTMLHeadingElement | null>;
  heroLanding: boolean;
}

export function HeroSection({ heroTitleRef, heroLanding }: HeroSectionProps) {
  const installCopy = useCopy();

  return (
    <div className="hero">
      <div className="hero-badge">
        <span /> v0.2.0
      </div>
      <h1
        ref={heroTitleRef}
        className={heroLanding ? 'hero-title--landing' : ''}
      >
        gooey-ui{' '}
        <img
          src="/mascot.png"
          alt="mascot"
          className={`hero-mascot${heroLanding ? ' hero-mascot--landing' : ''}`}
        />
      </h1>
      <p className="hero-description">
        Morphing toast notifications for React. Organic blob animations, promise
        tracking, and full customization out of the box.
      </p>
      <div className="hero-install">
        <div className="install-wrapper">
          <code>
            <span className="prompt">$</span> npm install gooey-ui motion
          </code>
          <button
            className="copy-btn"
            onClick={() => installCopy.copy('npm install gooey-ui motion')}
          >
            {installCopy.copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
