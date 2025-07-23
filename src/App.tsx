import { LanguageProvider } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/layout/LanguageSwitcher';
import { PrintButton } from './components/layout/PrintButton';
import { Wrapper } from './components/layout/wrapper';
import { Title } from './components/sections/title';
import { Contact } from './components/sections/contact';
import { WorkExperience } from './components/sections/work-experience';
import { Education } from './components/sections/education';
import { Skills } from './components/sections/skills';
import { Languages } from './components/sections/languages';
import { Interests } from './components/sections/interests';

export default function App() {
    return (
        <LanguageProvider>
            <LanguageSwitcher />
            <PrintButton />
            <Wrapper>
                <header className="flex flex-col gap-1.5 px-6 pt-3 pb-2.5 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-sky-500 after:to-emerald-500 print:px-6 print:pt-3 print:pb-2 print:gap-1 print:break-inside-avoid">
                    <Title />
                    <Contact />
                </header>
                <main className="grid grid-cols-2 gap-4 p-4 bg-white flex-1 overflow-visible print:p-4 print:gap-4 print:overflow-visible print:break-inside-avoid">
                    <div>
                        <WorkExperience />
                        <Education />
                    </div>
                    <div>
                        <Skills />
                        <Languages />
                        <Interests />
                    </div>
                </main>
            </Wrapper>
        </LanguageProvider>
    );
}
