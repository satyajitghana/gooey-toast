# Gooey Toast

Beautiful toast notifications with organic blob morphing animations.

## 🎉 Features

- 🌊 **Organic Animations** - Smooth blob morphing with physics-based springs
- ⚡ **Blazing Fast** - Built with Motion (v12) for 60fps performance
- 🎯 **TypeScript-first** - Full type safety and IntelliSense support
- 🌙 **Dark Mode** - Beautiful in both light and dark themes
- ♿ **Accessible** - WCAG 2.2 Level AA compliant with screen reader support
- 📦 **Lightweight** - Minimal bundle size with tree-shaking
- 🎨 **Customizable** - Extensive theming and styling options
- 🔄 **Promise Support** - Auto-updating toasts for async operations
- 🎭 **Motion Aware** - Respects prefers-reduced-motion
- 🧩 **shadcn Compatible** - Install via shadcn CLI

## 📦 Packages

- **[@gooey-ui/core](./packages/core)** - Core toast notification library
- **[@gooey-ui/tailwind-preset](./packages/preset)** - Tailwind CSS preset for customization

## 🚀 Quick Start

Install via shadcn CLI (recommended):

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

Or install manually:

```bash
npm install @gooey-ui/core
# or
pnpm add @gooey-ui/core
```

See the [core package README](./packages/core/README.md) for usage instructions.

## Quick Start

```bash
pnpm install
pnpm build
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

## 📁 Project Structure

```
gooey-toast/
├── packages/
│   ├── core/          # Main toast library (@gooey-ui/core)
│   └── preset/        # Tailwind CSS preset
├── apps/
│   ├── website/       # Showcase website (Next.js 15 + Tailwind v4)
│   ├── docs/          # Documentation site (planned)
│   └── storybook/     # Component stories (planned)
└── turbo.json         # Turborepo configuration
```

## License

MIT