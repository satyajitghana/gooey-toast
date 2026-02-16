'use client';

import Link from 'next/link';
import { SiteHeader } from '../components/site-header';
import { ArrowLeftIcon } from '../components/icons';

export default function ChangelogPage() {
  return (
    <>
      <SiteHeader heroVisible={true} currentPage="changelog" />
      <div className="site-container">
        <div className="page-changelog">
          <Link href="/" className="back-link">
            <ArrowLeftIcon /> Back to home
          </Link>

          <div className="changelog-header">
            <h1>Changelog</h1>
            <p>What&apos;s new in gooey-ui.</p>
          </div>

          <div className="changelog-entry">
            <div className="changelog-version">
              <span className="changelog-tag">v0.2.0</span>
              <span className="changelog-date">Feb 2026</span>
            </div>
            <div className="changelog-body">
              <h4>Spring Animation System</h4>
              <ul>
                <li>Configurable spring/bounce animations with intensity control (0.05 to 0.8)</li>
                <li>Per-toast and global spring toggle</li>
                <li>Smooth ease-in-out fallback when spring is disabled</li>
                <li>shadcn/ui registry for one-command installation</li>
                <li>Documentation website with interactive builder</li>
              </ul>
            </div>
          </div>

          <div className="changelog-entry">
            <div className="changelog-version">
              <span className="changelog-tag">v0.1.0</span>
              <span className="changelog-date">Feb 2026</span>
            </div>
            <div className="changelog-body">
              <h4>Initial Release</h4>
              <ul>
                <li>Organic blob morph animation (pill to blob and back)</li>
                <li>Five toast types: default, success, error, warning, info</li>
                <li>Description body with string or ReactNode support</li>
                <li>Action button with optional success label morph-back</li>
                <li>Promise toasts with loading to success/error transitions</li>
                <li>Configurable display duration and bounce intensity</li>
                <li>6 positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right</li>
                <li>Right-side positions auto-mirror the blob horizontally</li>
                <li>Hover pause: hovering an expanded toast pauses the dismiss timer</li>
                <li>Hover re-expand: hovering a collapsed pill re-expands the toast</li>
                <li>Pre-dismiss collapse animation (blob shrinks to pill before exit)</li>
                <li>Custom fill color, border color, and border width</li>
                <li>CSS class overrides via classNames prop</li>
                <li>Built on Sonner and Motion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
