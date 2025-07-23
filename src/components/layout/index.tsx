import { useLanguage } from '../../contexts';

// Print Button Component
export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="fixed top-4 right-4 z-10 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden shadow-lg font-medium transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
    >
      Print CV
    </button>
  );
}

// Language Switcher Component
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  return (
    <div className="fixed top-4 right-32 z-10 print:hidden">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-700">
          {language === 'en' ? 'EN' : 'PL'}
        </span>
        <div className="relative">
          <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${
            language === 'en' ? 'bg-blue-600' : 'bg-gray-400'
          }`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
              language === 'en' ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {language === 'en' ? 'English' : 'Polski'}
        </span>
      </button>
    </div>
  );
}

// Wrapper Component
export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto my-8 bg-white shadow-2xl rounded-lg overflow-hidden print:max-w-none print:my-0 print:shadow-none print:rounded-none print:overflow-visible">
      {children}
    </div>
  );
}