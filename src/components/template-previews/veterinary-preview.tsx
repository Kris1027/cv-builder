import { useTranslation } from 'react-i18next';
import { VeterinaryTemplate } from '@/components/templates/veterinary-template';
import { sampleVeterinaryCVData } from '@/data/sample-cv-data';
import { sampleVeterinaryCVDataPl } from '@/data/sample-cv-data-pl';
import { TemplateCardPreview } from './template-card-preview';

export const VeterinaryPreview = () => {
    const { i18n } = useTranslation();
    const isPolish = i18n.language === 'pl';

    return (
        <TemplateCardPreview>
            <VeterinaryTemplate
                data={isPolish ? sampleVeterinaryCVDataPl : sampleVeterinaryCVData}
            />
        </TemplateCardPreview>
    );
};
