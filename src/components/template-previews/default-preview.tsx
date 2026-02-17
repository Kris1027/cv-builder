import { useTranslation } from 'react-i18next';
import { DefaultTemplate } from '@/components/templates/default-template';
import { sampleDefaultCVData } from '@/data/sample-cv-data';
import { sampleDefaultCVDataPl } from '@/data/sample-cv-data-pl';
import { TemplateCardPreview } from './template-card-preview';

export const DefaultPreview = () => {
    const { i18n } = useTranslation();
    const isPolish = i18n.language === 'pl';

    return (
        <TemplateCardPreview>
            <DefaultTemplate data={isPolish ? sampleDefaultCVDataPl : sampleDefaultCVData} />
        </TemplateCardPreview>
    );
};
