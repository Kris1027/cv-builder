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
    <section className="animate-fadeIn">
      <Heading>{t('workExperience')}</Heading>
      <div className="space-y-4 mt-3">
        {validJobs.map((job: any, index: number) => (
          <div key={index} className="group relative transition-all duration-300 hover:translate-x-1">
            <div className="absolute -left-3 top-2 w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity print:hidden" />
            <div className='flex flex-wrap items-baseline gap-2 mb-2 print:mb-1'>
              <Subheading>{job.company}</Subheading>
              {job.position && <Subtitle className="text-blue-600">• {job.position}</Subtitle>}
            </div>
            {(job.period || job.location) && (
              <Info className="flex gap-2 text-gray-600">
                {job.period && <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {job.period}
                </span>}
                {job.period && job.location && <span className="text-gray-400">|</span>}
                {job.location && <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>}
              </Info>
            )}
            {job.tasks && job.tasks.filter((task: string) => task.trim()).length > 0 && (
              <ul className='flex flex-col gap-1 my-2 mx-0 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border-l-4 border-blue-600 shadow-sm print:my-1 print:mx-0 print:p-2 print:gap-0.5 print:break-inside-avoid'>
                {job.tasks.filter((task: string) => task.trim()).map((task: string, taskIndex: number) => (
                  <li key={taskIndex} className="text-sm font-normal text-slate-700 flex items-start leading-relaxed group/item transition-colors hover:text-slate-900 print:text-xs print:leading-tight">
                    <span className="text-blue-500 font-bold mr-2 mt-0.5 transition-transform group-hover/item:translate-x-1">›</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
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
    <section className="animate-fadeIn">
      <Heading>{t('education')}</Heading>
      <div className="mt-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-600 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1 print:p-3">
        {currentContent.education.profile && (
          <Subheading className="text-purple-900">{currentContent.education.profile}</Subheading>
        )}
        {(currentContent.education.period || currentContent.education.location) && (
          <Info className="flex gap-2 text-gray-600 mt-2">
            {currentContent.education.period && <span className="flex items-center gap-1">
              <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {currentContent.education.period}
            </span>}
            {currentContent.education.period && currentContent.education.location && <span className="text-gray-400">|</span>}
            {currentContent.education.location && <span className="flex items-center gap-1">
              <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {currentContent.education.location}
            </span>}
          </Info>
        )}
      </div>
    </section>
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
    <section className='animate-fadeIn'>
      <Heading>{t('skills')}</Heading>
      <div className='flex flex-wrap gap-2 mt-3 print:gap-1 print:mt-2'>
        {validSkills.map((skill: string, index: number) => (
          <span
            key={index}
            className='inline-flex items-center px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-md print:text-[10px] print:py-1 print:px-2'
          >
            <span className="w-1.5 h-1.5 bg-current rounded-full mr-2 print:w-1 print:h-1" />
            {skill}
          </span>
        ))}
      </div>
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

  const getLevelColor = (level: string) => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel.includes('native') || lowerLevel.includes('c2')) return 'bg-green-500';
    if (lowerLevel.includes('c1') || lowerLevel.includes('advanced')) return 'bg-blue-500';
    if (lowerLevel.includes('b2') || lowerLevel.includes('upper')) return 'bg-purple-500';
    if (lowerLevel.includes('b1') || lowerLevel.includes('intermediate')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <section className='animate-fadeIn'>
      <Heading>{t('languages')}</Heading>
      <div className='space-y-2 mt-3 print:space-y-1 print:mt-2'>
        {validLanguages.map((lang: any, index: number) => (
          <div
            key={index}
            className='flex items-center justify-between p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg transition-all duration-300 hover:shadow-md hover:translate-x-1 print:p-2'
          >
            <span className='text-sm font-medium text-gray-800 print:text-xs'>{lang.name}</span>
            <span className={`px-2 py-0.5 text-[10px] font-bold text-white rounded-full ${getLevelColor(lang.level)} print:text-[8px] print:px-1.5`}>
              {lang.level}
            </span>
          </div>
        ))}
      </div>
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

  const gradients = [
    'from-emerald-400 to-cyan-400',
    'from-purple-400 to-pink-400',
    'from-yellow-400 to-orange-400',
    'from-blue-400 to-indigo-400',
    'from-rose-400 to-pink-400',
    'from-teal-400 to-green-400',
  ];

  return (
    <section className='animate-fadeIn'>
      <Heading>{t('interests')}</Heading>
      <div className='flex flex-wrap gap-2 mt-3 print:gap-1 print:mt-2'>
        {validInterests.map((interest: string, index: number) => (
          <span
            key={index}
            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r ${gradients[index % gradients.length]} rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg print:text-[10px] print:py-1 print:px-2`}
          >
            <svg className="w-3 h-3 mr-1.5 print:w-2 print:h-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
}