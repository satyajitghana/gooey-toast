# @gooey-ui/core

Beautiful toast notifications with organic blob morphing animations.

## Installation

### Using shadcn CLI (Recommended)

The easiest way to add Gooey Toast to your project:

```bash
# npm
npx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json

# pnpm
pnpm dlx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json

# yarn
npx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json

# bun
bunx shadcn@latest add https://gooey-toast.vercel.app/r/gooey-toaster.json
```

This will automatically:
- Install `@gooey-ui/core` package
- Create a wrapper component at `components/ui/gooey-toaster.tsx`
- Import required styles

### Manual Installation

```bash
npm install @gooey-ui/core
# or
pnpm add @gooey-ui/core
# or
yarn add @gooey-ui/core
# or
bun add @gooey-ui/core
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
