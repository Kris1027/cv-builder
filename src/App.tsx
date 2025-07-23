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
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <LanguagesSection />
        <InterestsSection />
      </main>
    </div>
  );
};

export default App;
