import { useLanguage } from '../../hooks/useLanguage';
import { Heading } from '../ui/heading';
import { Subheading } from '../ui/subheading';
import { Subtitle } from '../ui/subtitle';

export function Languages() {
  const { t } = useLanguage();

  return (
    <div>
      <Heading>{t('languages')}</Heading>
      <ul className='flex gap-6 mt-3 print:gap-6 print:mt-3'>
        <li className='bg-slate-50 p-2 rounded-md border-t-4 border-emerald-500 text-center transition-all duration-200 min-w-[80px] hover:-translate-y-1 hover:shadow-xl print:p-3 print:min-w-[90px]'>
          <Subheading>{t('polish')}</Subheading>
          <Subtitle>{t('native')}</Subtitle>
        </li>
        <li className='bg-slate-50 p-2 rounded-md border-t-4 border-emerald-500 text-center transition-all duration-200 min-w-[80px] hover:-translate-y-1 hover:shadow-xl print:p-3 print:min-w-[90px]'>
          <Subheading>{t('english')}</Subheading>
          <Subtitle>{t('c1')}</Subtitle>
        </li>
      </ul>
    </div>
  );
}
