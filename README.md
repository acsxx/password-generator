# 🔐 Password Generator

A cryptographically secure password generator built with modern web technologies. Generate strong, random passwords entirely in your browser with customizable options and real-time strength analysis.

## Overview

This tool helps you create strong passwords with full control over character composition and length. All password generation happens client-side using the Web Crypto API, ensuring your passwords never leave your device.

## Features

- **Cryptographically Secure**: Uses `crypto.getRandomValues()` for true randomness
- **Highly Customizable**: 
  - Adjustable length (6-64 characters)
  - Character type selection (lowercase, uppercase, digits, symbols)
  - Option to exclude similar-looking characters (i, I, l, 1, o, O, 0)
  - Enforce inclusion of selected character types
- **Strength Indicator**: Real-time entropy calculation displayed in bits
- **One-Click Copy**: Copy generated passwords to clipboard instantly
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

Built with React and TypeScript:

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Framer Motion** - Animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/password-generator.git
cd password-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Security Note

**Privacy-First Design**: This password generator runs entirely in your browser. No passwords, settings, or data are ever sent to any server or stored remotely. All cryptographic operations use the browser's native `crypto.getRandomValues()` API, which provides cryptographically secure random values suitable for password generation.

**No Backend Required**: This is a pure client-side application. Your generated passwords exist only in your browser's memory and clipboard.

## License

MIT License - see [LICENSE](LICENSE) file for details.
