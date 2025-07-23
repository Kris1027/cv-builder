import { IoHome, IoLogoGithub, IoMailSharp, IoLogoLinkedin, IoCallSharp } from 'react-icons/io5';
import { useCVData, useLanguage } from '../../contexts';
import { Heading, Subheading, Subtitle, Info } from '../ui';

// CV Title Component
export function CVTitle() {
  const { cvData } = useCVData();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-wide print:text-2xl print:tracking-normal">
        {cvData.firstName} {cvData.lastName}
      </h1>
    </div>
  );
}

// CV Contact Component
export function CVContact() {
  const { cvData } = useCVData();

  const listItems = [
    ...(cvData.website ? [{
      name: cvData.website,
      href: cvData.websiteUrl,
      icon: IoHome,
    }] : []),
    ...(cvData.github ? [{
      name: cvData.github,
      href: cvData.githubUrl,
      icon: IoLogoGithub,
    }] : []),
    ...(cvData.linkedin ? [{
      name: cvData.linkedin,
      href: cvData.linkedinUrl,
      icon: IoLogoLinkedin,
    }] : []),
    ...(cvData.email ? [{
      name: cvData.email,
      href: `mailto:${cvData.email}`,
      icon: IoMailSharp,
    }] : []),
    ...(cvData.phone ? [{
      name: cvData.phone,
      href: `tel:${cvData.phone.replace(/\s/g, '')}`,
      icon: IoCallSharp,
    }] : []),
  ];

  if (listItems.length === 0) return null;

  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-1.5 auto-rows-auto print:gap-x-4 print:gap-y-1">
      {listItems.map((item) => (
        <li key={item.name}>
          <a 
            href={item.href} 
            target='_blank' 
            rel='noreferrer'
            className="text-sm flex items-center gap-1.5 no-underline text-white/90 font-medium transition-all duration-200 py-0.5 hover:text-white hover:-translate-y-0.5 print:text-sm print:py-0.5 print:gap-1.5"
          >
            <item.icon size={32} />
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

// CV Work Experience Component
export function CVWorkExperience() {
  const { cvData } = useCVData();
  const { t, language } = useLanguage();

  const currentContent = cvData.content?.[language];
  const validJobs = currentContent?.jobs?.filter((job: any) => 
    job.company?.trim() || job.position?.trim() || job.period?.trim() || job.location?.trim()
  ) || [];
  
  if (validJobs.length === 0) return null;

  return (
    <div>
      <Heading>{t('workExperience')}</Heading>
      <div>
        {validJobs.map((job: any, index: number) => (
          <div key={index} className={index > 0 ? 'mt-4' : ''}>
            <div className='flex items-center gap-2 mb-2 print:mb-1'>
              <Subheading>{job.company}</Subheading>
              <Subtitle>| {job.position}</Subtitle>
            </div>
            <Info>
              {job.period} | {job.location}
            </Info>
            {job.tasks && job.tasks.length > 0 && (
              <ul className='flex flex-col gap-0.5 my-1.5 mx-0 p-2 bg-slate-50 rounded-md border-l-4 border-blue-600 print:my-1 print:mx-0 print:p-1.5 print:gap-0.5 print:break-inside-avoid'>
                {job.tasks.filter((task: string) => task.trim()).map((task: string, taskIndex: number) => (
                  <li key={taskIndex} className="text-sm font-normal text-slate-800 flex items-start leading-tight before:content-['>'] before:text-sky-500 before:font-semibold before:mr-3 before:mt-0.5 before:flex-shrink-0 print:text-xs print:leading-tight">
                    <span className='pl-2'>{task}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// CV Education Component
export function CVEducation() {
  const { cvData } = useCVData();
  const { t, language } = useLanguage();

  const currentContent = cvData.content?.[language];
  const hasEducation = currentContent?.education.profile?.trim() || 
                      currentContent?.education.period?.trim() || 
                      currentContent?.education.location?.trim();
  
  if (!hasEducation) return null;

  return (
    <div className="mt-4">
      <Heading>{t('education')}</Heading>
      <div>
        <Subheading>{currentContent.education.profile}</Subheading>
        <Info>
          {currentContent.education.period} | {currentContent.education.location}
        </Info>
      </div>
    </div>
  );
}

// CV Skills Component
export function CVSkills() {
  const { cvData } = useCVData();
  const { t, language } = useLanguage();

  const currentContent = cvData.content?.[language];
  const validSkills = currentContent?.skills?.filter((skill: string) => skill.trim()) || [];
  
  if (validSkills.length === 0) return null;

  return (
    <section className='mb-4 print:mb-2'>
      <Heading>{t('skills')}</Heading>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 mt-2 print:gap-1 print:mt-1 print:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]'>
        {validSkills.map((skill: string, index: number) => (
          <li
            key={index}
            className='text-xs font-medium text-slate-800 bg-slate-50 py-1.5 px-2.5 rounded border-l-2 border-sky-500 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg print:text-[10px] print:py-1 print:px-1.5'
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

// CV Languages Component
export function CVLanguages() {
  const { cvData } = useCVData();
  const { t, language } = useLanguage();

  const currentContent = cvData.content?.[language];
  const validLanguages = currentContent?.languages?.filter((lang: any) => lang.name.trim()) || [];
  
  if (validLanguages.length === 0) return null;

  return (
    <section className='mb-4 print:mb-2'>
      <Heading>{t('languages')}</Heading>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2 mt-2 print:gap-1 print:mt-1 print:grid-cols-[repeat(auto-fit,minmax(110px,1fr))]'>
        {validLanguages.map((language: any, index: number) => (
          <li
            key={index}
            className='text-xs font-medium text-slate-800 bg-slate-50 py-1.5 px-2.5 rounded border-l-2 border-purple-500 transition-all duration-200 hover:bg-purple-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg print:text-[10px] print:py-1 print:px-1.5 flex justify-between items-center'
          >
            <span>{language.name}</span>
            <span className='text-[10px] font-bold text-purple-600 hover:text-white print:text-[8px]'>
              {language.level}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// CV Interests Component
export function CVInterests() {
  const { cvData } = useCVData();
  const { t, language } = useLanguage();

  const currentContent = cvData.content?.[language];
  const validInterests = currentContent?.interests?.filter((interest: string) => interest.trim()) || [];
  
  if (validInterests.length === 0) return null;

  return (
    <section className='mb-4 print:mb-2'>
      <Heading>{t('interests')}</Heading>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 mt-2 print:gap-1.5 print:mt-1 print:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'>
        {validInterests.map((interest: string, index: number) => (
          <li
            key={index}
            className='text-xs font-medium text-white bg-gradient-to-br from-emerald-500 to-sky-500 py-2 px-3 rounded-full text-center transition-all duration-200 border-2 border-transparent relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-600 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 print:text-[10px] print:py-1 print:px-2'
          >
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}