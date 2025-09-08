# CV Builder App - Development Notes

## 🔴 IMPORTANT: Development Guidelines
**Every time a new feature is implemented, it MUST be documented in this CLAUDE.md file.**
This file serves as the development knowledge base for Claude to maintain context across sessions.

## App Overview
A modern CV/Resume builder application built with React, TypeScript, and TanStack Router.

## Tech Stack
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Routing**: TanStack Router
- **Forms**: TanStack Form
- **Styling**: Tailwind CSS
- **UI Components**: Custom components in `/components/ui` (shadcn/ui style)

## Project Structure
```
src/
├── components/
│   ├── ui/              # Base UI components (button, card, input, etc.)
│   ├── form-sections/    # Form section components for CV builder
│   │   ├── personal-info-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── education-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── languages-section.tsx
│   │   └── interests-section.tsx
│   ├── templates/        # CV templates
│   └── template-previews/
├── pages/
│   ├── builder-page.tsx  # Main form builder page
│   ├── preview-page.tsx  # CV preview page
│   └── templates-page.tsx
├── routes/               # TanStack Router route definitions
├── types/
│   └── form-types.ts    # TypeScript interfaces for form data
└── lib/                 # Utility functions and constants

```

## Key Features
- **Multi-section CV Form**: Personal info, experience, education, skills, languages, interests
- **Template Support**: Multiple CV templates (modern, business)
- **Auto-save**: Saves to localStorage every 30 seconds
- **Form Validation**: Required field validation with error messages
- **Progress Tracking**: Visual progress indicator showing form completion
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI/UX**: Gradient designs, animations, hover effects

## Available Scripts
```bash
pnpm run dev      # Start development server
pnpm run build    # Build for production
pnpm run preview  # Preview production build
pnpm lint         # Check for TypeScript and ESLint errors
```

## Development Server
- URL: http://localhost:5173/
- Hot Module Replacement (HMR) enabled

## Form Data Structure
All form data is stored in localStorage under the key `cvData` with the following structure:
```typescript
{
  templateId: string;
  personalInfo: PersonalInfoProps;
  experiences: ExperienceProps[];
  education: EducationProps[];
  skills: SkillProps[];
  languages: LanguageProps[];
  interests: InterestProps[];
}
```

## Recent Updates (2025-09-08)
1. **Refactored form sections** into separate component files for better maintainability
2. **Modernized UI/UX** with:
   - Gradient backgrounds and card designs
   - Color-coded sections with icons
   - Smooth animations and transitions
   - Empty state illustrations
   - Hover effects on interactive elements
3. **Added form enhancements**:
   - Real-time progress tracking
   - Auto-save functionality with visual feedback
   - Manual save button
   - Form validation with inline error messages
   - Helpful placeholders and tips
4. **Improved user experience**:
   - Skill/interest tags with inline add/remove
   - Disabled end date when "Currently working" is checked
   - Better visual hierarchy and spacing
   - Responsive grid layouts

## Known Issues/Notes
- TypeScript `any` types are used for form field types in component props (ESLint warns about this but app works fine)
- Auto-save creates both `cvData` and `cvData_backup` in localStorage

## TypeScript Form Typing (FIXED)
✅ **Fixed on 2025-09-08**: All `any` type ESLint errors have been resolved.

**Solution implemented**:
1. Created `/types/form-component-types.ts` with shared form type interfaces
2. All form section components now use `FormApi` type instead of `any`
3. The type definition file uses ESLint disable comment for necessary `any` types
4. Reduced ESLint errors from 34 to 0

**Files updated**:
- Created: `/types/form-component-types.ts` - Shared form type definitions
- Updated all form sections to use `FormApi` type:
  - `/components/form-sections/personal-info-section.tsx`
  - `/components/form-sections/experience-section.tsx`
  - `/components/form-sections/education-section.tsx`
  - `/components/form-sections/skills-section.tsx`
  - `/components/form-sections/languages-section.tsx`
  - `/components/form-sections/interests-section.tsx`

**Type structure**:
- `FormField` interface for field-level types
- `FormApi` interface for the form instance
- Uses generic `any` in the type definition file (intentional for flexibility)

## Routes
- `/` - Home page
- `/templates` - Template selection
- `/builder` - CV form builder
- `/preview` - CV preview with selected template
- `/templates/:templateId` - Individual template preview

## Data Persistence
- Form data is stored in localStorage
- Auto-save every 30 seconds
- Manual save button available
- Data persists across sessions

## Validation Rules
- First Name: Required
- Last Name: Required  
- Email: Required, must be valid email format
- Other fields: Optional

## Build Output
- Build directory: `dist/`
- Assets are code-split and optimized
- CSS is extracted and minified