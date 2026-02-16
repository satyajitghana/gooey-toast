'use client';

import { gooeyToast } from 'gooey-ui';
import type { GooeyToastOptions } from 'gooey-ui';
import { InstallTabs } from './install-tabs';

const DEMO_DEFAULTS = {
  spring: true,
  timing: { displayDuration: 3000 },
} satisfies GooeyToastOptions;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function failAfter(ms: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Failed')), ms),
  );
}

export function DocsSection() {
  return (
    <div className="docs" id="docs">
      <div className="docs-header">
        <h2>Documentation</h2>
        <p>
          Everything you need to add morphing toast notifications to your React
          app.
        </p>
      </div>

      {/* 01 - Quick Start */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">01</div>
          <h3>Quick Start</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Add the <span className="inline-code">GooeyToaster</span> provider
            and call <span className="inline-code">gooeyToast</span> from
            anywhere.
          </p>
          <pre>
            <code>{`import { GooeyToaster, gooeyToast } from 'gooey-ui'

function App() {
  return (
    <>
      <GooeyToaster position="bottom-right" />
      <button onClick={() => gooeyToast.success('Saved!')}>
        Save
      </button>
    </>
  )
}`}</code>
          </pre>
          <p>
            Requires <span className="inline-code">react</span>,{' '}
            <span className="inline-code">react-dom</span>, and{' '}
            <span className="inline-code">motion</span> as peer dependencies.
          </p>
        </div>
      </div>

      {/* 02 - shadcn/ui */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">02</div>
          <h3>shadcn/ui</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Install as a shadcn component with a single command. This adds a
            thin wrapper to your{' '}
            <span className="inline-code">components/ui</span> directory and
            auto-installs dependencies.
          </p>
          <InstallTabs variant="shadcn" />
          <p>Then use it in your layout:</p>
          <pre>
            <code>{`import { GooeyToaster } from "@/components/ui/gooey-toaster"
import { gooeyToast } from "@/components/ui/gooey-toaster"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GooeyToaster />
      </body>
    </html>
  )
}

// Trigger from anywhere
gooeyToast.success("Saved!")`}</code>
          </pre>
        </div>
      </div>

      {/* 03 - Toast Types */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">03</div>
          <h3>Toast Types</h3>
        </div>
        <div className="doc-section-content">
          <pre>
            <code>{`gooeyToast('Hello')                    // default (neutral)
gooeyToast.success('Saved!')           // green
gooeyToast.error('Failed')             // red
gooeyToast.warning('Careful')          // yellow
gooeyToast.info('FYI')                 // blue`}</code>
          </pre>
          <div className="doc-try-buttons">
            <button
              onClick={() =>
                gooeyToast('Notification received', DEMO_DEFAULTS)
              }
            >
              Default
            </button>
            <button
              onClick={() =>
                gooeyToast.success('Changes Saved', DEMO_DEFAULTS)
              }
            >
              Success
            </button>
            <button
              onClick={() =>
                gooeyToast.error('Something went wrong', DEMO_DEFAULTS)
              }
            >
              Error
            </button>
            <button
              onClick={() =>
                gooeyToast.warning('Storage is almost full', DEMO_DEFAULTS)
              }
            >
              Warning
            </button>
            <button
              onClick={() =>
                gooeyToast.info('New update available', DEMO_DEFAULTS)
              }
            >
              Info
            </button>
          </div>
        </div>
      </div>

      {/* 04 - Description */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">04</div>
          <h3>Description</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Pass a string or any{' '}
            <span className="inline-code">ReactNode</span> as the description
            to expand the toast into a blob.
          </p>
          <pre>
            <code>{`gooeyToast.error('Payment failed', {
  description: 'Your card was declined.',
})

// Custom component as body
gooeyToast.success('Deployed', {
  description: (
    <div>
      <strong>Production</strong>
      <span>main @ 3f8a2c1</span>
    </div>
  ),
})`}</code>
          </pre>
          <div className="doc-try-buttons">
            <button
              onClick={() =>
                gooeyToast.warning('Your session is about to expire', {
                  ...DEMO_DEFAULTS,
                  description:
                    "You've been inactive for 25 minutes. Please save your work or your session will end automatically.",
                })
              }
            >
              Warning + Description
            </button>
            <button
              onClick={() =>
                gooeyToast.error('Connection lost', {
                  ...DEMO_DEFAULTS,
                  description:
                    'Unable to reach the server. Check your internet connection and try again.',
                })
              }
            >
              Error + Description
            </button>
          </div>
        </div>
      </div>

      {/* 05 - Action Button */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">05</div>
          <h3>Action Button</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Add <span className="inline-code">successLabel</span> for a pill
            morph-back animation on click.
          </p>
          <pre>
            <code>{`gooeyToast.info('Share link ready', {
  description: 'Your link has been generated.',
  action: {
    label: 'Copy to Clipboard',
    onClick: () => navigator.clipboard.writeText(url),
    successLabel: 'Copied!',   // optional morph-back
  },
})`}</code>
          </pre>
          <div className="doc-try-buttons">
            <button
              onClick={() =>
                gooeyToast.error('Payment failed', {
                  ...DEMO_DEFAULTS,
                  description:
                    'Your card ending in 4242 was declined. Please update your payment method to continue.',
                  action: {
                    label: 'Update Payment',
                    onClick: () =>
                      gooeyToast.success('Redirecting...', DEMO_DEFAULTS),
                  },
                })
              }
            >
              Error + Action
            </button>
            <button
              onClick={() =>
                gooeyToast.info('Share link ready', {
                  ...DEMO_DEFAULTS,
                  description:
                    'Your share link has been generated and is ready to copy.',
                  action: {
                    label: 'Copy to Clipboard',
                    onClick: () =>
                      navigator.clipboard.writeText(
                        'https://example.com/share/abc123',
                      ),
                    successLabel: 'Copied!',
                  },
                })
              }
            >
              Action + Success Pill
            </button>
          </div>
        </div>
      </div>

      {/* 06 - Promise Toasts */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">06</div>
          <h3>Promise Toasts</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Automatically transitions from loading to success/error when the
            promise resolves.
          </p>
          <pre>
            <code>{`gooeyToast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Changes saved',
  error: 'Something went wrong',
  description: {
    success: 'All changes have been synced.',
    error: 'Please try again later.',
  },
  action: {
    error: {
      label: 'Retry',
      onClick: () => retry(),
    },
  },
})`}</code>
          </pre>
          <div className="doc-try-buttons">
            <button
              onClick={() =>
                gooeyToast.promise(sleep(2000), {
                  ...DEMO_DEFAULTS,
                  loading: 'Saving...',
                  success: 'Changes Saved',
                  error: 'Something went wrong',
                })
              }
            >
              Promise + Success (pill)
            </button>
            <button
              onClick={() =>
                gooeyToast.promise(failAfter(2000), {
                  ...DEMO_DEFAULTS,
                  loading: 'Saving...',
                  success: 'Changes Saved',
                  error: 'Something went wrong',
                })
              }
            >
              Promise + Error (pill)
            </button>
            <button
              onClick={() =>
                gooeyToast.promise(sleep(2000), {
                  ...DEMO_DEFAULTS,
                  loading: 'Processing...',
                  success: 'All done!',
                  error: 'Failed',
                  description: {
                    success:
                      'Your data has been processed and saved successfully.',
                  },
                })
              }
            >
              Promise + Success (expanded)
            </button>
          </div>
        </div>
      </div>

      {/* 07 - Timings */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">07</div>
          <h3>Timings</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Control how long toasts stay visible with the{' '}
            <span className="inline-code">timing</span> option.
          </p>
          <div className="table-scroll">
            <table className="prop-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>displayDuration</td>
                  <td>number</td>
                  <td>4000</td>
                  <td>Milliseconds toast stays visible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 08 - Toaster Props */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">08</div>
          <h3>Toaster Props</h3>
        </div>
        <div className="doc-section-content">
          <p>
            6 positions supported. Right-side positions auto-mirror the blob
            horizontally. Center positions use a symmetric morph where the body
            grows outward from the pill.
          </p>
          <pre>
            <code>{`<GooeyToaster position="top-center" />`}</code>
          </pre>
          <div className="table-scroll">
            <table className="prop-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>position</td>
                  <td>string</td>
                  <td>&apos;bottom-right&apos;</td>
                  <td>
                    6 positions: top-left, top-center, top-right, bottom-left,
                    bottom-center, bottom-right
                  </td>
                </tr>
                <tr>
                  <td>duration</td>
                  <td>number</td>
                  <td>---</td>
                  <td>Default display duration (ms)</td>
                </tr>
                <tr>
                  <td>gap</td>
                  <td>number</td>
                  <td>14</td>
                  <td>Gap between stacked toasts</td>
                </tr>
                <tr>
                  <td>offset</td>
                  <td>number | string</td>
                  <td>&apos;24px&apos;</td>
                  <td>Distance from screen edge</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>&apos;light&apos; | &apos;dark&apos;</td>
                  <td>&apos;light&apos;</td>
                  <td>Color theme</td>
                </tr>
                <tr>
                  <td>spring</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Enable spring/bounce animations globally</td>
                </tr>
                <tr>
                  <td>bounce</td>
                  <td>number</td>
                  <td>0.4</td>
                  <td>
                    Spring intensity: 0.05 (subtle) to 0.8 (dramatic)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 09 - Options */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">09</div>
          <h3>Options</h3>
        </div>
        <div className="doc-section-content">
          <div className="table-scroll">
            <table className="prop-table">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>description</td>
                  <td>ReactNode</td>
                  <td>Body content (string or component)</td>
                </tr>
                <tr>
                  <td>action</td>
                  <td>GooeyToastAction</td>
                  <td>Action button config</td>
                </tr>
                <tr>
                  <td>icon</td>
                  <td>ReactNode</td>
                  <td>Custom icon override</td>
                </tr>
                <tr>
                  <td>duration</td>
                  <td>number</td>
                  <td>Display duration in ms</td>
                </tr>
                <tr>
                  <td>id</td>
                  <td>string | number</td>
                  <td>Unique toast identifier</td>
                </tr>
                <tr>
                  <td>classNames</td>
                  <td>GooeyToastClassNames</td>
                  <td>CSS class overrides</td>
                </tr>
                <tr>
                  <td>fillColor</td>
                  <td>string</td>
                  <td>Background color of the blob</td>
                </tr>
                <tr>
                  <td>borderColor</td>
                  <td>string</td>
                  <td>Border color of the blob</td>
                </tr>
                <tr>
                  <td>borderWidth</td>
                  <td>number</td>
                  <td>Border width in px (default 1.5)</td>
                </tr>
                <tr>
                  <td>timing</td>
                  <td>GooeyToastTimings</td>
                  <td>Animation timing overrides</td>
                </tr>
                <tr>
                  <td>spring</td>
                  <td>boolean</td>
                  <td>
                    Enable spring/bounce animations (default true)
                  </td>
                </tr>
                <tr>
                  <td>bounce</td>
                  <td>number</td>
                  <td>
                    Spring intensity: 0.05 (subtle) to 0.8 (dramatic), default
                    0.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 10 - Custom Styling */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">10</div>
          <h3>Custom Styling</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Override styles for any part of the toast with{' '}
            <span className="inline-code">classNames</span>.
          </p>
          <pre>
            <code>{`gooeyToast.success('Styled!', {
  fillColor: '#1a1a2e',
  borderColor: '#333',
  borderWidth: 2,
  classNames: {
    wrapper: 'my-wrapper',
    title: 'my-title',
    description: 'my-desc',
    actionButton: 'my-btn',
  },
})`}</code>
          </pre>
          <div className="doc-try-buttons">
            <button
              onClick={() =>
                gooeyToast.success('Styled!', {
                  ...DEMO_DEFAULTS,
                  fillColor: '#1a1a2e',
                  borderColor: '#333',
                  borderWidth: 2,
                  description: 'Custom fill and border styling.',
                })
              }
            >
              Try Custom Style
            </button>
          </div>
          <div className="table-scroll">
            <table className="prop-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>wrapper</td>
                  <td>Outer container</td>
                </tr>
                <tr>
                  <td>content</td>
                  <td>Content area</td>
                </tr>
                <tr>
                  <td>header</td>
                  <td>Icon + title row</td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>Title text</td>
                </tr>
                <tr>
                  <td>icon</td>
                  <td>Icon wrapper</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>Body text</td>
                </tr>
                <tr>
                  <td>actionWrapper</td>
                  <td>Button container</td>
                </tr>
                <tr>
                  <td>actionButton</td>
                  <td>Action button</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 11 - Spring Animation */}
      <div className="doc-section">
        <div className="doc-section-label">
          <div className="doc-number">11</div>
          <h3>Spring Animation</h3>
        </div>
        <div className="doc-section-content">
          <p>
            Disable the spring/bounce effect for a cleaner, more subtle
            animation style. Set per-toast or globally on the Toaster.
          </p>
          <pre>
            <code>{`// Per-toast
gooeyToast.success('Saved', {
  description: 'Your changes have been synced.',
  spring: false,
})

// Global default
<GooeyToaster spring={false} />`}</code>
          </pre>
          <p>
            When <span className="inline-code">spring</span> is{' '}
            <span className="inline-code">false</span>, all spring-based
            animations (landing squish, blob morph, pill resize, header squish)
            use smooth ease-in-out curves instead. Error shake still works
            regardless. Per-toast values override the global setting.
          </p>
          <div className="doc-try-buttons">
            <button
              onClick={() =>
                gooeyToast.success('Smooth save', {
                  ...DEMO_DEFAULTS,
                  spring: false,
                })
              }
            >
              No Spring (pill)
            </button>
            <button
              onClick={() =>
                gooeyToast.warning('Storage warning', {
                  ...DEMO_DEFAULTS,
                  spring: false,
                  description:
                    'You are using 95% of your available storage.',
                })
              }
            >
              No Spring (expanded)
            </button>
            <button
              onClick={() =>
                gooeyToast.success('Bouncy save', {
                  ...DEMO_DEFAULTS,
                  spring: true,
                })
              }
            >
              With Spring (compare)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
