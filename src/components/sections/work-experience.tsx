import { useLanguage } from '../../hooks/useLanguage';
import { Heading } from '../ui/heading';
import { Info } from '../ui/info';
import { Subheading } from '../ui/subheading';
import { Subtitle } from '../ui/subtitle';

export function WorkExperience() {
  const { t } = useLanguage();

  return (
    <div>
      <Heading>{t('workExperience')}</Heading>
      <div>
        <div>
          <div className='flex items-center gap-2 mb-2 print:mb-1'>
            <Subheading>TechCorp Inc.</Subheading>
            <Subtitle>| {t('m8bPosition')}</Subtitle>
          </div>
          <Info>
            {t('m8bPeriod')} | {t('m8bLocation')}
          </Info>
          <ul className='flex flex-col gap-0.5 my-1.5 mx-0 p-2 bg-slate-50 rounded-md border-l-4 border-blue-600 print:my-1 print:mx-0 print:p-1.5 print:gap-0.5 print:break-inside-avoid'>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('m8bTask1')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('m8bTask2')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('m8bTask3')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('m8bTask4')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('m8bTask5')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('m8bTask6')}</span>
            </li>
          </ul>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-2 print:mb-1'>
            <Subheading>Digital Solutions Ltd.</Subheading>
            <Subtitle>| {t('vanGelderPosition')}</Subtitle>
          </div>
          <Info>
            {t('vanGelderPeriod')} | {t('vanGelderLocation')}
          </Info>
          <ul className='flex flex-col gap-0.5 my-1.5 mx-0 p-2 bg-slate-50 rounded-md border-l-4 border-blue-600 print:my-1 print:mx-0 print:p-1.5 print:gap-0.5 print:break-inside-avoid'>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('vanGelderTask1')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('vanGelderTask2')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('vanGelderTask3')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('vanGelderTask4')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('vanGelderTask5')}</span>
            </li>
            <li className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
              <span className='pl-2'>{t('vanGelderTask6')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
