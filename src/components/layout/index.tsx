import { useLanguage } from '../../contexts';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className='fixed top-4 right-4 z-10 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 print:hidden'
    >
      Print CV
    </button>
  );
}

// Language Switcher Component
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className='fixed top-4 right-20 z-10 print:hidden'>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'pl')}
        className='px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      >
        <option value='en'>English</option>
        <option value='pl'>Polski</option>
      </select>
    </div>
  );
}

// Wrapper Component
export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-4xl mx-auto my-8 bg-white shadow-2xl rounded-lg overflow-hidden print:max-w-none print:my-0 print:shadow-none print:rounded-none print:overflow-visible'>
      {children}
    </div>
  );
}
