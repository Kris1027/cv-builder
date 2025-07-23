import { useLanguage } from '../../hooks/useLanguage';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 flex bg-white rounded-md shadow-md border border-slate-200 overflow-hidden z-[1000] print:hidden">
      <button
        className={`px-3 py-2 font-medium text-sm cursor-pointer transition-all duration-200 min-w-[45px] border-r border-slate-200 ${
          language === 'en'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-3 py-2 font-medium text-sm cursor-pointer transition-all duration-200 min-w-[45px] ${
          language === 'pl'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
        onClick={() => setLanguage('pl')}
      >
        PL
      </button>
    </div>
  );
}
