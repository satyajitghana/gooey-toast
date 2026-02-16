# @gooey-ui/core

Beautiful toast notifications with organic blob morphing animations.

## Installation

```bash
npm install @gooey-ui/core
# or
pnpm add @gooey-ui/core
# or
yarn add @gooey-ui/core
```

## Quick Start

```tsx
import { GoeyToaster, toast } from '@gooey-ui/core';
import '@gooey-ui/core/styles.css';

// Add the toaster to your app
function App() {
  return (
    <>
      <YourApp />
      <GoeyToaster position="bottom-right" />
    </>
  );
}

// Use it anywhere
function MyComponent() {
  return (
    <button onClick={() => toast.success('Hello World!')}>
      Show Toast
    </button>
  );
}
```

## Features

- 🎨 Five beautiful variants (default, success, error, warning, info)
- 🌊 Organic blob morphing animations
- ⚡ Built on Motion for smooth 60fps animations
- 🎯 TypeScript-first with full type safety
- 🌙 Dark mode support
- ♿ WCAG 2.2 Level AA accessible
- 🎭 Respects prefers-reduced-motion
- 📦 Lightweight and tree-shakeable
- 🔄 Promise support for async operations
- 🎬 Customizable animations and springs

## Documentation

Coming soon!

## License

MIT
