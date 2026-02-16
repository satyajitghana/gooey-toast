'use client';

import { GoeyToaster, toast } from '@gooey-ui/core';
import { useState } from 'react';

export default function Home() {
  const [position, setPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-right');

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gooey Toast
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Beautiful toast notifications with organic blob morphing animations
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/satyajitghana/gooey-toast"
              className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@gooey-ui/core"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              npm Package
            </a>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Try it out!</h2>

            {/* Position Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">Toast Position</label>
              <div className="grid grid-cols-3 gap-2">
                {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      position === pos
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pos.split('-').join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Variants Demo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Toast Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={() => toast('This is a default toast', { variant: 'default' })}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Default
                </button>
                <button
                  onClick={() => toast.success('Operation successful!', { variant: 'success' })}
                  className="px-4 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Success
                </button>
                <button
                  onClick={() => toast.error('Something went wrong', { variant: 'error' })}
                  className="px-4 py-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Error
                </button>
                <button
                  onClick={() => toast.warning('Please be careful', { variant: 'warning' })}
                  className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Warning
                </button>
                <button
                  onClick={() => toast.info('Did you know?', { variant: 'info' })}
                  className="px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Info
                </button>
                <button
                  onClick={() => toast.loading('Loading...', { variant: 'loading' })}
                  className="px-4 py-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Loading
                </button>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Advanced Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    toast.success('Check out this description!', {
                      variant: 'success',
                      description: 'Toasts can have additional description text for more context.',
                    });
                  }}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:scale-105 transition-transform text-left"
                >
                  <div className="font-semibold">With Description</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Shows additional context</div>
                </button>

                <button
                  onClick={() => {
                    toast('Action Required', {
                      variant: 'default',
                      action: {
                        label: 'Undo',
                        onClick: () => toast.success('Action undone!'),
                      },
                    });
                  }}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:scale-105 transition-transform text-left"
                >
                  <div className="font-semibold">With Action Button</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Interactive toast with button</div>
                </button>

                <button
                  onClick={() => {
                    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
                    toast.promise(promise, {
                      loading: 'Processing...',
                      success: 'All done!',
                      error: 'Failed!',
                    });
                  }}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:scale-105 transition-transform text-left"
                >
                  <div className="font-semibold">Promise Toast</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Auto-updates based on promise</div>
                </button>

                <button
                  onClick={() => {
                    toast.success('Custom Duration', {
                      duration: 10000,
                      description: 'This toast will stay for 10 seconds',
                    });
                  }}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:scale-105 transition-transform text-left"
                >
                  <div className="font-semibold">Custom Duration</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Control how long it stays</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Beautiful Variants</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Six distinct variants with perfect color schemes for every use case
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🌊</div>
            <h3 className="text-xl font-bold mb-2">Organic Animations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Smooth blob morphing animations powered by Motion
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">TypeScript First</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Full type safety with excellent IntelliSense support
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">♿</div>
            <h3 className="text-xl font-bold mb-2">Accessible</h3>
            <p className="text-gray-600 dark:text-gray-400">
              WCAG 2.2 Level AA compliant with screen reader support
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🌙</div>
            <h3 className="text-xl font-bold mb-2">Dark Mode</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Beautiful in both light and dark themes out of the box
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Lightweight</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Minimal bundle size with tree-shaking support
            </p>
          </div>
        </div>

        {/* Installation Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <div className="bg-gray-900 dark:bg-black rounded-lg p-4 mb-4">
              <code className="text-green-400 font-mono">npm install @gooey-ui/core</code>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or with pnpm:
            </p>
            <div className="bg-gray-900 dark:bg-black rounded-lg p-4">
              <code className="text-green-400 font-mono">pnpm add @gooey-ui/core</code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Built with ❤️ using Next.js and Motion</p>
          <p className="mt-2">
            <a href="https://github.com/satyajitghana/gooey-toast" className="hover:text-purple-600 transition-colors">
              View on GitHub
            </a>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <GoeyToaster position={position} />
    </main>
  );
}
