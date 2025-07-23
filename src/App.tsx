import EducationSection from './components/sections/education-section';
import ExperienceSection from './components/sections/experience-section';
import InfoSection from './components/sections/info-section';
import InterestsSection from './components/sections/interests-section';
import LanguagesSection from './components/sections/languages-section';
import SkillsSection from './components/sections/skills-section';
import PrintButton from './components/ui/print-button';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Export button - fixed position */}
      <div className="fixed top-4 right-4 z-10 print:hidden">
        <PrintButton />
      </div>

      {/* CV Content */}
      <main id="cv-content" className="max-w-4xl mx-auto bg-white">
        <InfoSection />
        
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
          {/* Left column - Main content (Experience & Education) */}
          <div className="lg:col-span-2 space-y-4">
            <ExperienceSection />
            <EducationSection />
          </div>
          
          {/* Right column - Skills, Languages, Interests */}
          <div className="space-y-4">
            <SkillsSection />
            <LanguagesSection />
            <InterestsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
