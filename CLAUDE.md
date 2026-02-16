# CV Builder

A CV/Resume builder built with React, TypeScript, and TanStack Router. Supports multiple templates, dark mode, i18n (PL/EN), and PDF export/import.

**Every new feature MUST be documented in this file.**

## Scripts

```bash
pnpm run dev      # Dev server at http://localhost:5173/
pnpm run build    # Production build to dist/
pnpm run preview  # Preview production build
pnpm lint         # TypeScript + ESLint checks
```

## Project Structure

```
src/
├── components/
│   ├── ui/                # Base UI components (shadcn/ui style)
│   ├── form-sections/     # CV form section components
│   │   ├── personal-info-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── education-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── languages-section.tsx
│   │   ├── interests-section.tsx
│   │   └── gdpr-consent-section.tsx
│   ├── templates/         # CV render templates (developer, default, veterinary)
│   └── template-previews/ # Template preview cards
├── contexts/              # React Context providers (theme)
├── data/                  # Sample data, type interfaces for CV data
├── hooks/                 # Custom hooks (use-theme)
├── lib/                   # Utilities (pdf-parser, helpers)
├── locales/               # i18n translations (en/, pl/)
├── pages/                 # Page components
│   ├── builder-page.tsx   # Main form builder
│   ├── preview-page.tsx   # CV preview + PDF export
│   ├── templates-page.tsx # Template gallery
│   └── template-page.tsx  # Single template preview
├── routes/                # TanStack Router route definitions
└── types/                 # TypeScript types (form-types, form-component-types, theme)
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home page |
| `/templates` | Template selection gallery |
| `/templates/:templateId` | Individual template preview |
| `/builder` | CV form builder |
| `/preview` | CV preview with PDF export |

## Tech Stack

- **Framework**: React + TypeScript (strict mode)
- **Build**: Vite
- **Package Manager**: pnpm
- **Routing**: TanStack Router
- **Forms**: TanStack Form
- **Styling**: Tailwind CSS
- **PDF**: pdfjs-dist (import), html2canvas + jsPDF (export)
- **i18n**: react-i18next (PL + EN)

## Architecture & Conventions

### Data Flow

- Form data stored in localStorage under key `cvData` (+ `cvData_backup`)
- Auto-save every 30 seconds, manual save button available
- Template selection passed via URL query param `?templateId=`

### Form Data Shape

Types defined in `/src/types/form-types.ts`:

```typescript
{
  templateId: string;
  personalInfo: PersonalInfoProps;
  experiences: ExperienceProps[];
  education: EducationProps[];
  skills: SkillProps[];
  languages: LanguageProps[];
  interests: InterestProps[];
  gdprConsent: GdprConsentProps; // { enabled: boolean; companyName: string }
}
```

### Validation

- First Name, Last Name, Email: required
- Email: must be valid format
- All other fields: optional

### Form Component Types

Form section components accept a `FormApi` type from `/src/types/form-component-types.ts`. This file uses ESLint-disabled `any` internally for TanStack Form flexibility.

## CV Templates

Three templates, each in `/src/components/templates/`:

| Template | Font | Color | Audience |
|----------|------|-------|----------|
| `developer` | JetBrains Mono | Purple/blue | Tech professionals |
| `default` | Montserrat | Gray | All industries |
| `veterinary` | Lato + Merriweather | Emerald/teal | Animal healthcare |

Google Fonts are imported in `/src/index.css`. Atkinson Hyperlegible is used for UI elements.

### Critical Template Rules

- **CV templates MUST always have white background** — dark mode only affects surrounding UI
- **All templates must be print-optimized** with proper page breaks
- **Language proficiency** uses European framework: A1, A2, B1, B2, C1, C2, NATIVE
- **New sections** added to one template must be added to all three

### Template Detection (PDF Import)

The PDF parser (`/src/lib/pdf-parser.ts`) detects templates by section markers:
- Developer: `// WORK EXPERIENCE`, `// TECH STACK`
- Default: `PROFESSIONAL EXPERIENCE`, `CORE COMPETENCIES`
- Veterinary: `SPECIAL INTERESTS`

## Dark Mode

- Three modes: Light, Dark, System (auto-detect)
- Provider: `/src/contexts/theme-context.tsx`
- Hook: `/src/hooks/use-theme.ts`
- Persists choice in localStorage, responds to system preference changes
- Theme toggle present on all major pages

## i18n

- Translation files: `/src/locales/en/translation.json`, `/src/locales/pl/translation.json`
- All user-facing strings must use `t()` from react-i18next
- New strings must be added in both EN and PL

## GDPR Consent Clause

- Toggle in builder form enables/disables the clause on the CV
- With company name: uses `cv.gdprConsent` translation (mentions company by name)
- Without company name: uses `cv.gdprConsentGeneric` translation (generic clause)
- Rendered at the bottom of all three templates when enabled
- Form data: `GdprConsentProps { enabled: boolean; companyName: string }`

## PDF Import

- Uses `pdfjs-dist` to extract CV data from PDF metadata (Keywords field)
- Falls back to raw text parsing if no metadata found
- Only works reliably with PDFs generated by this application
- Entry point: "Load PDF" button in builder page header
