# CV Builder

A modern, intuitive CV builder application that helps users create professional resumes quickly and efficiently. Built with React, TypeScript, and modern web technologies.

## Features

- **Multiple Professional Templates**: Choose from modern and business CV templates
- **Real-time Preview**: See your CV changes instantly with live preview
- **Comprehensive Form Builder**: Add personal information, experience, education, skills, languages, and interests
- **Data Persistence**: Your CV data is saved locally for easy editing
- **PDF Export**: Print or download your CV as a PDF
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Sign-up Required**: Start building your CV immediately without registration
- **100% Free**: All features available at no cost

## Technologies Used

### Core Technologies
- **React 19** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **TanStack Router** - Type-safe routing for React applications
- **TanStack Form** - Powerful form management library

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **shadcn/ui components** - Pre-built UI components
- **Lucide React** - Beautiful & consistent icons
- **Class Variance Authority (CVA)** - Component variant management

### Additional Libraries
- **date-fns** - Date utility library
- **React Day Picker** - Date picker component
- **clsx & tailwind-merge** - Utility for constructing className strings

## Project Structure

```
cv-builder/
├── src/
│   ├── components/
│   │   ├── templates/        # CV template components
│   │   ├── template-previews/ # Template preview cards
│   │   └── ui/               # Reusable UI components
│   ├── pages/                # Page components
│   │   ├── index-page.tsx    # Landing page
│   │   ├── templates-page.tsx # Template selection
│   │   ├── builder-page.tsx  # CV form builder
│   │   └── preview-page.tsx  # CV preview & export
│   ├── routes/               # Route definitions
│   ├── lib/                  # Utilities and helpers
│   └── types/                # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cv-builder.git
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
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm tsc --noEmit` - Type check without emitting files

## How It Works

1. **Template Selection**: Users start by choosing a CV template (Modern or Business)
2. **Form Builder**: Fill in your information using the intuitive form interface:
   - Personal Information (name, contact, social links)
   - Work Experience (with date pickers and descriptions)
   - Education background
   - Skills list
   - Languages with proficiency levels
   - Personal interests
3. **Live Preview**: View your CV in real-time as you make changes
4. **Export Options**: Print or download your completed CV as PDF

## Features in Detail

### Smart Data Management
- Data is automatically saved to localStorage when you submit the form
- Edit mode: Access your saved CV data when clicking "Edit CV" from preview
- New CV mode: Start fresh when selecting a template from the templates page

### Template System
- **Modern Template**: Clean, contemporary design with blue accents
- **Business Template**: Traditional, formal layout for corporate positions
- Easily extensible architecture for adding new templates

### Form Validation & UX
- Dynamic form fields - add/remove sections as needed
- Date pickers for experience and education entries
- Language proficiency levels (A1-C2 CEFR scale)
- Current employment checkbox for work experience

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Future Enhancements

- [ ] Additional CV templates
- [ ] Multiple CV management
- [ ] Cloud storage integration
- [ ] AI-powered content suggestions
- [ ] Multi-language support
- [ ] Custom template builder
- [ ] Import from LinkedIn
- [ ] Cover letter builder

## Support

For issues, questions, or suggestions, please open an issue on GitHub.