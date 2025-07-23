import EducationSection from './components/sections/education-section';
import ExperienceSection from './components/sections/experience-section';
import InfoSection from './components/sections/info-section';
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
    </main>
  );
};

export default App;
