import { useLanguage } from '../../hooks/useLanguage';

export function Title() {
  const { t } = useLanguage();

  return (
    <h1 className='text-white text-2xl font-bold tracking-tight mb-0 print:text-2xl print:mb-0'>
      <span className='text-white font-bold'>{t('firstName')} </span>
      <span className='text-white font-bold'>{t('lastName')}</span>
    </h1>
  );
}
