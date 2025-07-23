import { useLanguage } from '../../hooks/useLanguage';
import { Heading } from '../ui/heading';
import { Info } from '../ui/info';
import { Subtitle } from '../ui/subtitle';

export function Education() {
  const { t } = useLanguage();

  return (
    <div>
      <Heading>{t('education')}</Heading>
      <Subtitle>{t('educationProfile')}</Subtitle>
      <Info>
        {t('educationPeriod')} | {t('educationLocation')}
      </Info>
      <br />
    </div>
  );
}
