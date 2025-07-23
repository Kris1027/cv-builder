import EducationSection from './components/sections/education-section';
import ExperienceSection from './components/sections/experience-section';
import InfoSection from './components/sections/info-section';
import InterestsSection from './components/sections/interests-section';
import LanguagesSection from './components/sections/languages-section';
import SkillsSection from './components/sections/skills-section';

const App = () => {
  return (
    <main>
      <InfoSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <LanguagesSection />
      <InterestsSection />
    </main>
  );
};

export default App;
