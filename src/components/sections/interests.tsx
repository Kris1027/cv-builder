import { useLanguage } from '../../hooks/useLanguage';
import { Heading } from '../ui/heading';
import { interestsList } from '../../data/interests';

export function Interests() {
  const { t } = useLanguage();

  return (
    <section className='mb-4 print:mb-2'>
      <Heading>{t('interests')}</Heading>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 mt-2 print:gap-1.5 print:mt-1 print:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'>
        {interestsList.map((interestKey, index) => (
          <li
            key={index}
            className='text-xs font-medium text-white bg-gradient-to-br from-emerald-500 to-sky-500 py-2 px-3 rounded-full text-center transition-all duration-200 border-2 border-transparent relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-600 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 print:text-[10px] print:py-1 print:px-2'
          >
            {t(interestKey)}
          </li>
        ))}
      </ul>
    </section>
  );
}
