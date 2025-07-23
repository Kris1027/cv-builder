import EducationSection from './components/sections/education-section';
import ExperienceSection from './components/sections/experience-section';
import InfoSection from './components/sections/info-section';
import SkillsSection from './components/sections/skills-section';

const App = () => {
  return (
    <main>
      <InfoSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </main>
  );
};

export default App;
