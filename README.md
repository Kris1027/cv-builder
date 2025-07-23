# Modern CV Template - React TypeScript

A modern, responsive CV/Resume template built with React, TypeScript, and Vite. Features a professional design with multi-language support and print optimization.

## 🚀 Features

- **Modern Design**: Clean, professional layout with gradient headers and card-based sections
- **Multi-Language Support**: Toggle between English and Polish with a single click
- **Print Optimized**: Perfectly fits on one A4 page when printing or saving as PDF
- **Responsive Layout**: Grid-based layout that adapts to different screen sizes
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Type Safe**: Built with TypeScript for better development experience

## 🛠️ Technologies Used

### Core Framework

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Styling & Design

- **CSS Modules** - Scoped CSS for component-based styling
- **CSS Custom Properties** - Modern CSS variables for theming
- **CSS Grid & Flexbox** - Modern layout techniques
- **Google Fonts** - Inter (main font) and JetBrains Mono (code font)

### State Management

- **React Context API** - For language switching and global state
- **React Hooks** - useState, useContext for state management

### Development Tools

- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation
- **Vite HMR** - Hot Module Replacement for fast development

## 🎨 Design System

### Color Palette

- **Primary**: Blue gradient (#2563eb → #1d4ed8)
- **Secondary**: Slate gray (#64748b)
- **Accent**: Sky blue (#0ea5e9)
- **Success**: Emerald green (#10b981)
- **Background**: Clean whites and light grays

### Typography

- **Headings**: Inter font family, various weights
- **Body Text**: Inter with optimized line heights
- **Code/Technical**: JetBrains Mono for job titles

### Layout Structure

```
Header (Gradient Background)
├── Name & Title
└── Contact Information

Main Content (Two-Column Grid)
├── Left Column
│   ├── Work Experience
│   └── Skills
└── Right Column
    ├── Languages
    └── Interests
```

## 🌍 Multi-Language System

### Language Switcher

- Fixed position toggle button (top-right)
- Hidden during print/PDF export
- Instant language switching without page reload

### Translation Architecture

```typescript
// Context-based translation system
const translations = {
  en: {
    /* English translations */
  },
  pl: {
    /* Polish translations */
  },
};

// Usage in components
const { t } = useLanguage();
<Heading>{t('workExperience')}</Heading>;
```

### Supported Languages

- **English (EN)** - Default language
- **Polish (PL)** - Complete translation including job descriptions

## 🖨️ Print Optimization

### Print-Specific Features

- **A4 Page Size**: Optimized for standard A4 paper
- **Single Page Layout**: All content fits on one page
- **Print-Only CSS**: Special styles that only apply when printing
- **Hidden Elements**: Language switcher automatically hidden
- **Color Preservation**: Gradients and colors maintained in PDF

### Print CSS Implementation

```css
@media print {
  /* Compact spacing for single-page layout */
  .main {
    padding: 1rem !important;
  }

  /* Hide interactive elements */
  .languageSwitcher {
    display: none !important;
  }

  /* Optimize font sizes */
  .heading {
    font-size: 0.9rem !important;
  }
}
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── header/          # Header section components
│   ├── main/            # Main content components
│   ├── LanguageSwitcher.tsx
│   └── [component].module.css
├── contexts/            # React Context providers
│   └── LanguageContext.tsx
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone [https://github.com/Kris1027/cv-template]

# Navigate to project directory
cd cv-template

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📄 Creating Your CV

### 1. Update Personal Information

Edit the translation files in `src/contexts/LanguageContext.tsx`:

- Name and contact details
- Job titles and descriptions
- Skills and technologies
- Languages and proficiency levels
- Interests and hobbies

### 2. Customize Styling

Modify CSS variables in `src/index.css`:

```css
:root {
  --primary: #2563eb; /* Main brand color */
  --accent: #0ea5e9; /* Accent color */
  --success: #10b981; /* Success/highlight color */
}
```

### 3. Export as PDF

1. Run the development server
2. Choose your preferred language (EN/PL)
3. Press `Ctrl+P` (or `Cmd+P` on Mac)
4. Select "Save as PDF"
5. Ensure "Print backgrounds" is enabled
6. Set margins to "Minimum"
7. Save your professional CV!

## 🎯 Key Features Explained

### Responsive Grid Layout

- **Desktop**: Two-column layout for optimal space usage
- **Print**: Compressed single-page layout
- **Mobile**: Single-column stack (if extended for mobile)

### Interactive Elements

- **Hover Effects**: Subtle animations on skills and interests
- **Color Transitions**: Smooth color changes on interactive elements
- **Gradient Backgrounds**: Professional gradient overlays

### Performance Optimizations

- **CSS Modules**: Scoped styles prevent conflicts
- **TypeScript**: Compile-time error checking
- **Vite**: Fast development and optimized builds
- **Tree Shaking**: Only used code included in final bundle

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
