import { useCVData, useLanguage } from '../contexts';
import { LanguageSwitcher, PrintButton, Wrapper } from './layout';
import { CVTitle, CVContact, CVWorkExperience, CVEducation, CVSkills, CVLanguages, CVInterests } from './cv-sections';

export function CVDisplay() {
  const { currentView, setCurrentView, cvData } = useCVData();
  const { language } = useLanguage();

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
        <main className="p-6 bg-white flex-1 overflow-visible print:p-4 print:overflow-visible print:break-inside-avoid">
          {(() => {
            const currentContent = cvData.content?.[language];
            const hasWorkExperience = currentContent?.jobs?.some((job: any) => 
              job.company?.trim() || job.position?.trim()
            );
            const hasEducation = currentContent?.education.profile?.trim() || 
                               currentContent?.education.period?.trim();
            const hasSkills = currentContent?.skills?.some((skill: string) => skill.trim());
            const hasLanguages = currentContent?.languages?.some((lang: any) => lang.name.trim());
            const hasInterests = currentContent?.interests?.some((interest: string) => interest.trim());
            
            const hasLeftColumn = hasWorkExperience || hasEducation;
            const hasRightColumn = hasSkills || hasLanguages || hasInterests;
            
            // If both columns have content, use grid layout
            if (hasLeftColumn && hasRightColumn) {
              return (
                <div className="grid grid-cols-2 gap-6 print:gap-4">
                  <div className="space-y-6 print:space-y-4">
                    <CVWorkExperience />
                    <CVEducation />
                  </div>
                  <div className="space-y-4 print:space-y-3">
                    <CVSkills />
                    <CVLanguages />
                    <CVInterests />
                  </div>
                </div>
              );
            }
            
            // If only left column has content, use full width
            if (hasLeftColumn && !hasRightColumn) {
              return (
                <div className="max-w-4xl mx-auto space-y-6 print:space-y-4">
                  <CVWorkExperience />
                  <CVEducation />
                </div>
              );
            }
            
            // If only right column has content, center it
            if (!hasLeftColumn && hasRightColumn) {
              return (
                <div className="max-w-2xl mx-auto space-y-4 print:space-y-3">
                  <CVSkills />
                  <CVLanguages />
                  <CVInterests />
                </div>
              );
            }
            
            // If no content at all, show a placeholder
            return (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg className="w-24 h-24 mb-4 print:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium mb-2 print:text-base">Your CV is empty</p>
                <p className="text-sm text-gray-500 print:text-xs">Add some information to get started</p>
              </div>
            );
          })()}
        </main>
      </Wrapper>
    </div>
  );
}