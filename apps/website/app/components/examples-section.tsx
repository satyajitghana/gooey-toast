'use client';

import { gooeyToast } from 'gooey-ui';
import type { GooeyToastOptions } from 'gooey-ui';

const DEMO_DEFAULTS = {
  spring: true,
  timing: {
    displayDuration: 3000,
  },
} satisfies GooeyToastOptions;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function failAfter(ms: number) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Failed')), ms));
}

export function ExamplesSection() {
  return (
    <div className="examples">
      <div className="examples-header">
        <h2>Examples</h2>
        <span>Click to preview</span>
      </div>

      <div className="section">
        <div className="section-label">Toast Types</div>
        <div className="buttons">
          <button onClick={() => gooeyToast('Notification received', DEMO_DEFAULTS)}>Default</button>
          <button onClick={() => gooeyToast.success('Changes Saved', DEMO_DEFAULTS)}>Success</button>
          <button onClick={() => gooeyToast.error('Something went wrong', DEMO_DEFAULTS)}>Error</button>
          <button onClick={() => gooeyToast.warning('Storage is almost full', DEMO_DEFAULTS)}>Warning</button>
          <button onClick={() => gooeyToast.info('New update available', DEMO_DEFAULTS)}>Info</button>
        </div>
      </div>

      <div className="section">
        <div className="section-label">With Description</div>
        <div className="buttons">
          <button onClick={() => gooeyToast.warning('Your session is about to expire', { ...DEMO_DEFAULTS, description: "You've been inactive for 25 minutes. Please save your work or your session will end automatically." })}>
            Warning + Description
          </button>
          <button onClick={() => gooeyToast.error('Connection lost', { ...DEMO_DEFAULTS, description: 'Unable to reach the server. Check your internet connection and try again.' })}>
            Error + Description
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-label">With Action Button</div>
        <div className="buttons">
          <button onClick={() => gooeyToast.error('Payment failed', { ...DEMO_DEFAULTS, description: 'Your card ending in 4242 was declined. Please update your payment method to continue.', action: { label: 'Update Payment', onClick: () => gooeyToast.success('Redirecting...', DEMO_DEFAULTS) } })}>
            Error + Action
          </button>
          <button onClick={() => gooeyToast.info('Share link ready', { ...DEMO_DEFAULTS, description: 'Your share link has been generated and is ready to copy.', action: { label: 'Copy to Clipboard', onClick: () => navigator.clipboard.writeText('https://example.com/share/abc123'), successLabel: 'Copied!' } })}>
            Action + Success Pill
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Custom Component Body</div>
        <div className="buttons">
          <button onClick={() => gooeyToast.success('Deployment complete', {
            ...DEMO_DEFAULTS,
            description: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 300 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#888' }}>Environment</span>
                  <span style={{ fontWeight: 600 }}>Production</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#888' }}>Branch</span>
                  <span style={{ fontWeight: 600 }}>main @ 3f8a2c1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#888' }}>Duration</span>
                  <span style={{ fontWeight: 600 }}>2m 14s</span>
                </div>
                <div style={{ height: 1, background: '#e5e5e5' }} />
                <div style={{ fontSize: 11, color: '#888' }}>https://my-app.vercel.app</div>
              </div>
            ),
          })}>
            ReactNode Description
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-label">No Spring (Smooth Easing)</div>
        <div className="buttons">
          <button onClick={() => gooeyToast.success('Changes Saved', { ...DEMO_DEFAULTS, spring: false })}>Success (no spring)</button>
          <button onClick={() => gooeyToast.error('Connection lost', { ...DEMO_DEFAULTS, spring: false, description: 'Unable to reach the server. Check your internet connection and try again.' })}>Error + Desc (no spring)</button>
          <button onClick={() => gooeyToast.info('Share link ready', { ...DEMO_DEFAULTS, spring: false, description: 'Your share link has been generated and is ready to copy.', action: { label: 'Copy to Clipboard', onClick: () => navigator.clipboard.writeText('https://example.com/share/abc123'), successLabel: 'Copied!' } })}>Action (no spring)</button>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Promise (Morph Animation)</div>
        <div className="buttons">
          <button onClick={() => gooeyToast.promise(sleep(2000), { ...DEMO_DEFAULTS, loading: 'Saving...', success: 'Changes Saved', error: 'Something went wrong' })}>
            Promise + Success (pill)
          </button>
          <button onClick={() => gooeyToast.promise(failAfter(2000), { ...DEMO_DEFAULTS, loading: 'Saving...', success: 'Changes Saved', error: 'Something went wrong' })}>
            Promise + Error (pill)
          </button>
          <button onClick={() => gooeyToast.promise(failAfter(2000), { ...DEMO_DEFAULTS, loading: 'Uploading file...', success: 'Upload complete', error: 'Upload failed', description: { error: "You've used 95% of your available storage. Please upgrade and plan to continue." }, action: { error: { label: 'Action Button', onClick: () => gooeyToast.info('Retrying...', DEMO_DEFAULTS) } } })}>
            Promise + Error (expanded)
          </button>
          <button onClick={() => gooeyToast.promise(sleep(2000), { ...DEMO_DEFAULTS, loading: 'Processing...', success: 'All done!', error: 'Failed', description: { success: 'Your data has been processed and saved successfully.' } })}>
            Promise + Success (expanded)
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Real World</div>
        <div className="buttons">
          <button onClick={() => gooeyToast.success('Item added to cart', { ...DEMO_DEFAULTS, description: 'Nike Air Max 90 — $129.99' })}>
            E-commerce
          </button>
          <button onClick={() => gooeyToast.promise(sleep(2500), { ...DEMO_DEFAULTS, loading: 'Uploading report.pdf...', success: 'Upload complete', error: 'Upload failed', action: { success: { label: 'Open File', onClick: () => gooeyToast.info('Opening file...', DEMO_DEFAULTS) } } })}>
            File Upload
          </button>
          <button onClick={() => gooeyToast.success('Payment processed', {
            ...DEMO_DEFAULTS,
            description: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#888' }}>Amount</span>
                  <span style={{ fontWeight: 600 }}>$49.99</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#888' }}>Card</span>
                  <span style={{ fontWeight: 600 }}>•••• 4242</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#888' }}>Date</span>
                  <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            ),
          })}>
            Payment
          </button>
          <button onClick={() => gooeyToast.info('Document shared', { ...DEMO_DEFAULTS, description: 'Shared with 3 team members', action: { label: 'View', onClick: () => gooeyToast.success('Opening document...', DEMO_DEFAULTS) } })}>
            Collaboration
          </button>
          <button onClick={() => gooeyToast.warning('Session expiring', { ...DEMO_DEFAULTS, description: 'Your session will end in 5 minutes due to inactivity.', action: { label: 'Extend Session', onClick: () => gooeyToast.success('Session extended', DEMO_DEFAULTS), successLabel: 'Extended!' } })}>
            Auth
          </button>
        </div>
      </div>
    </div>
  );
}
