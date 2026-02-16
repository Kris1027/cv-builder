# CV Builder

A modern, intuitive CV builder application that helps users create professional resumes quickly and efficiently. Built with React, TypeScript, and modern web technologies.

## Features

- **3 Professional Templates**: Developer, Default, and Veterinary — each with unique fonts, colors, and layouts
- **Bilingual (PL/EN)**: Full Polish and English language support with one-click toggle
- **Dark Mode**: Light, Dark, and System theme options
- **Smooth Animations**: Browser-native View Transition API for page transitions + CSS entrance animations
- **PDF Export & Import**: Download your CV as PDF, or import a previously exported PDF to continue editing
- **GDPR Consent Clause**: Optional GDPR/RODO consent text with or without a company name
- **Drag & Drop Reordering**: Reorder experience, education, skills, languages, and interests sections
- **Data Persistence**: Auto-save to localStorage with manual save and backup
- **Single/Multi-Page Mode**: Preview CV in paginated or fit-to-one-page layout
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Sign-up Required**: Start building your CV immediately without registration
- **100% Free**: All features available at no cost

## Technologies Used

### Core
- **React 19** - UI library
- **TypeScript** (strict mode) - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing with View Transition API support
- **TanStack Form** - Form state management

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
- **shadcn/ui** - Pre-built UI components
- **Lucide React** - Icon library
- **dnd-kit** - Drag and drop toolkit

### Additional Libraries
- **react-i18next** - Internationalization (PL + EN)
- **pdfjs-dist** - PDF parsing for import
- **html2canvas + jsPDF** - PDF export
- **date-fns** - Date utilities
- **DOMPurify** - HTML sanitization

## Project Structure

```
cv-builder/
├── src/
│   ├── components/
│   │   ├── form-sections/     # CV form section components
│   │   ├── templates/         # CV render templates (developer, default, veterinary)
│   │   ├── template-previews/ # Template preview SVG cards
│   │   └── ui/                # Reusable UI components (shadcn/ui)
│   ├── contexts/              # React Context providers (theme)
│   ├── data/                  # Sample data and CV data types
│   ├── hooks/                 # Custom hooks (use-theme)
│   ├── i18n/                  # i18n configuration
│   ├── lib/                   # Utilities (pdf-parser, pdf-export, helpers)
│   ├── locales/               # Translation files (en/, pl/)
│   ├── pages/                 # Page components
│   │   ├── index-page.tsx     # Landing page
│   │   ├── templates-page.tsx # Template selection gallery
│   │   ├── template-page.tsx  # Individual template preview
│   │   ├── builder-page.tsx   # CV form builder
│   │   └── preview-page.tsx   # CV preview & PDF export
│   ├── routes/                # TanStack Router route definitions
│   └── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kris1027/cv-builder.git
cd cv-builder
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (TypeScript check + Vite build)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## How It Works

1. **Choose a Template**: Pick from Developer, Default, or Veterinary templates
2. **Fill in Your Details**: Use the form builder with sections for:
   - Personal Information (name, contact, social links)
   - Work Experience (drag & drop reordering, current employment toggle)
   - Education
   - Skills
   - Languages (A1–C2 CEFR scale + Native)
   - Interests
   - GDPR Consent Clause (optional)
3. **Preview Your CV**: View in multi-page or single-page mode
4. **Export as PDF**: Download with embedded metadata for future re-import

## Templates

| Template | Font | Color Scheme | Audience |
|----------|------|--------------|----------|
| Developer | JetBrains Mono | Purple/blue | Tech professionals |
| Default | Montserrat | Gray | All industries |
| Veterinary | Lato + Merriweather | Emerald/teal | Animal healthcare |

## Animations

Page transitions use the browser-native **View Transition API** via TanStack Router — zero extra dependencies. Entrance animations (fade, scale, blur, slide) are CSS-only with staggered delays. All animations respect `prefers-reduced-motion`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please [open an issue on GitHub](https://github.com/Kris1027/cv-builder/issues).
