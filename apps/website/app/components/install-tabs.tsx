'use client';

import { useState } from 'react';
import { useCopy } from './use-copy';
import { CopyIcon, CheckIcon } from './icons';

interface InstallTabsProps {
  variant?: 'package' | 'shadcn';
}

interface Tab {
  id: string;
  label: string;
  command: string;
}

const packageTabs: Tab[] = [
  { id: 'pnpm', label: 'pnpm', command: 'pnpm add gooey-ui motion' },
  { id: 'npm', label: 'npm', command: 'npm install gooey-ui motion' },
  { id: 'yarn', label: 'yarn', command: 'yarn add gooey-ui motion' },
  { id: 'bun', label: 'bun', command: 'bun add gooey-ui motion' },
];

const shadcnTabs: Tab[] = [
  { id: 'npx', label: 'npx', command: 'npx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json' },
  { id: 'pnpm-dlx', label: 'pnpm dlx', command: 'pnpm dlx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json' },
  { id: 'bunx', label: 'bunx', command: 'bunx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json' },
];

export function InstallTabs({ variant = 'package' }: InstallTabsProps) {
  const tabs = variant === 'shadcn' ? shadcnTabs : packageTabs;
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { copied, copy } = useCopy();

  const activeCommand = tabs.find((tab) => tab.id === activeTab)?.command ?? '';

  return (
    <div className="install-tabs">
      <div className="install-tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="install-tab"
            data-active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="install-tabs-content">
        <pre><code><span className="prompt">$</span> {activeCommand}</code></pre>
        <button className="copy-btn" onClick={() => copy(activeCommand)}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}
