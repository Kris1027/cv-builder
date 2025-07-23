import { useLanguage } from '../../hooks/useLanguage';
import { Heading } from '../ui/heading';
import { skillsList } from '../../data/skills';

export function Skills() {
  const { t } = useLanguage();

  return (
    <section className='mb-4 print:mb-2'>
      <Heading>{t('skills')}</Heading>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 mt-2 print:gap-1 print:mt-1 print:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]'>
        {skillsList.map((skill) => (
          <li
            key={skill}
            className='text-xs font-medium text-slate-800 bg-slate-50 py-1.5 px-2.5 rounded border-l-2 border-sky-500 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg print:text-[10px] print:py-1 print:px-1.5'
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
