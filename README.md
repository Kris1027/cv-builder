<div align="center">

# CV Builder

A modern, intuitive CV/Resume builder with multiple templates, dark mode, i18n, and PDF export.

[![Stars][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]

[![React][React-badge]][React-url]
[![TypeScript][TypeScript-badge]][TypeScript-url]
[![Vite][Vite-badge]][Vite-url]
[![TailwindCSS][Tailwind-badge]][Tailwind-url]

</div>

## Table of Contents

- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Templates](#templates)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- **3 Professional Templates** — Developer, Default, and Veterinary with unique fonts, colors, and layouts
- **Bilingual (PL/EN)** — Full Polish and English language support with one-click toggle
- **Dark Mode** — Light, Dark, and System theme options
- **Smooth Animations** — Browser-native View Transition API for page transitions + CSS entrance animations
- **PDF Export & Import** — Download your CV as PDF, or import a previously exported PDF to continue editing
- **GDPR Consent Clause** — Optional GDPR/RODO consent text with or without a company name
- **Drag & Drop Reordering** — Reorder experience, education, skills, languages, and interests sections
- **Data Persistence** — Auto-save to localStorage with manual save and backup
- **Single/Multi-Page Mode** — Preview CV in paginated or fit-to-one-page layout
- **Accessible** — Animations respect `prefers-reduced-motion`, keyboard-navigable
- **No Sign-up Required** — Start building immediately, 100% free

## Built With

### Core

- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) (strict mode) — Type-safe JavaScript
- [Vite](https://vite.dev/) — Build tool and dev server
- [TanStack Router](https://tanstack.com/router) — Type-safe routing with View Transition API support
- [TanStack Form](https://tanstack.com/form) — Form state management

### UI & Styling

- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) — Accessible, unstyled UI primitives
- [shadcn/ui](https://ui.shadcn.com/) — Pre-built UI components
- [Lucide React](https://lucide.dev/) — Icon library
- [dnd-kit](https://dndkit.com/) — Drag and drop toolkit

### Additional Libraries

- [react-i18next](https://react.i18next.com/) — Internationalization (PL + EN)
- [pdfjs-dist](https://mozilla.github.io/pdf.js/) — PDF parsing for import
- [html2canvas](https://html2canvas.hertzen.com/) + [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) — PDF export
- [date-fns](https://date-fns.org/) — Date utilities
- [DOMPurify](https://github.com/cure53/DOMPurify) — HTML sanitization

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager

### Installation

```bash
git clone https://github.com/Kris1027/cv-builder.git
cd cv-builder
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (TypeScript check + Vite build) |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## How It Works

1. **Choose a Template** — Pick from Developer, Default, or Veterinary templates
2. **Fill in Your Details** — Personal info, work experience, education, skills, languages, interests, and optional GDPR consent
3. **Preview Your CV** — View in multi-page or single-page mode
4. **Export as PDF** — Download with embedded metadata for future re-import

## Templates

| Template | Font | Color Scheme | Audience |
|----------|------|--------------|----------|
| Developer | JetBrains Mono | Purple/blue | Tech professionals |
| Default | Montserrat | Gray | All industries |
| Veterinary | Lato + Merriweather | Emerald/teal | Animal healthcare |

## Project Structure

```
src/
├── components/
│   ├── form-sections/     # CV form section components
│   ├── templates/         # CV render templates (developer, default, veterinary)
│   ├── template-previews/ # Template preview SVG cards
│   └── ui/                # Reusable UI components (shadcn/ui)
├── contexts/              # React Context providers (theme)
├── data/                  # Sample data and CV data types
├── hooks/                 # Custom hooks (use-theme)
├── i18n/                  # i18n configuration
├── lib/                   # Utilities (pdf-parser, pdf-export, helpers)
├── locales/               # Translation files (en/, pl/)
├── pages/                 # Page components
├── routes/                # TanStack Router route definitions
└── types/                 # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Copyright (c) 2025 Kris1027. All rights reserved.

This project is provided for viewing and reference purposes only. No permission is granted to copy, modify, distribute, or use this software for any purpose without explicit written consent from the author.

## Support

For issues, questions, or suggestions, please [open an issue on GitHub](https://github.com/Kris1027/cv-builder/issues).

<!-- Shields -->
[stars-shield]: https://img.shields.io/github/stars/Kris1027/cv-builder.svg?style=for-the-badge
[stars-url]: https://github.com/Kris1027/cv-builder/stargazers
[forks-shield]: https://img.shields.io/github/forks/Kris1027/cv-builder.svg?style=for-the-badge
[forks-url]: https://github.com/Kris1027/cv-builder/network/members
[issues-shield]: https://img.shields.io/github/issues/Kris1027/cv-builder.svg?style=for-the-badge
[issues-url]: https://github.com/Kris1027/cv-builder/issues

<!-- Tech Badges -->
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[TypeScript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev/
[Tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
