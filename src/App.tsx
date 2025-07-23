import { LanguageProvider, CVDataProvider, useCVData } from './contexts';
import { MainMenu, CVForm, CVDisplay } from './components';

function AppContent() {
    const { currentView, startNewCV, viewExample } = useCVData();
    
    switch (currentView) {
        case 'menu':
            return <MainMenu onStartBuilding={startNewCV} onViewExample={viewExample} />;
        case 'form':
            return <CVForm />;
        case 'example':
        case 'userCV':
            return <CVDisplay />;
        default:
            return <MainMenu onStartBuilding={startNewCV} onViewExample={viewExample} />;
    }
}

export default function App() {
    return (
        <LanguageProvider>
            <CVDataProvider>
                <AppContent />
            </CVDataProvider>
        </LanguageProvider>
    );
}
