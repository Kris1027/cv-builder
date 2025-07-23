import { useCVData } from '../contexts';
import { LanguageSwitcher, PrintButton, Wrapper } from './layout';
import { CVTitle, CVContact, CVWorkExperience, CVEducation, CVSkills, CVLanguages, CVInterests } from './cv-sections';

export function CVDisplay() {
  const { currentView, setCurrentView } = useCVData();

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleEditCV = () => {
    setCurrentView('form');
  };

  return (
    <div>
      <div className="fixed top-4 left-4 z-10 flex gap-2">
        <button
          onClick={handleBackToMenu}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 print:hidden"
        >
          Back to Menu
        </button>
        {currentView === 'userCV' && (
          <button
            onClick={handleEditCV}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 print:hidden"
          >
            Edit CV
          </button>
        )}
      </div>
      
      <LanguageSwitcher />
      <PrintButton />
      <Wrapper>
        <header className="flex flex-col gap-1.5 px-6 pt-3 pb-2.5 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-sky-500 after:to-emerald-500 print:px-6 print:pt-3 print:pb-2 print:gap-1 print:break-inside-avoid">
          <CVTitle />
          <CVContact />
        </header>
        <main className="grid grid-cols-2 gap-4 p-4 bg-white flex-1 overflow-visible print:p-4 print:gap-4 print:overflow-visible print:break-inside-avoid">
          <div>
            <CVWorkExperience />
            <CVEducation />
          </div>
          <div>
            <CVSkills />
            <CVLanguages />
            <CVInterests />
          </div>
        </main>
      </Wrapper>
    </div>
  );
}