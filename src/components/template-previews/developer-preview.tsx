import { useTranslation } from 'react-i18next';
import { DeveloperTemplate } from '@/components/templates/developer-template';
import { sampleCVData } from '@/data/sample-cv-data';
import { sampleCVDataPl } from '@/data/sample-cv-data-pl';
import { TemplateCardPreview } from './template-card-preview';

export const DeveloperPreview = () => {
    const { i18n } = useTranslation();
    const isPolish = i18n.language === 'pl';

    return (
        <TemplateCardPreview>
            <DeveloperTemplate data={isPolish ? sampleCVDataPl : sampleCVData} />
        </TemplateCardPreview>
    );
};
