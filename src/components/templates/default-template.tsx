import type { CVData } from '@/data/sample-cv-data';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { formatLinkedinDisplay, formatPolishPhone } from '@/lib/utils';
import { DescriptionList } from '@/components/description-list';
import { useTranslation } from 'react-i18next';

interface DefaultTemplateProps {
  data: CVData;
}

export function DefaultTemplate({ data }: DefaultTemplateProps) {
  const { t } = useTranslation();
  const { personalInfo, experiences, education, skills, languages, interests, gdprConsent } = data;

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthKey = `monthsShort.${parseInt(month) - 1}`;
    return `${t(monthKey)} ${year}`;
  };

  const formatYear = (dateString: string): string => {
    if (!dateString) return '';
    const [year] = dateString.split('-');
    return year;
  };

  return (
    <div className="bg-white font-['Montserrat'] text-gray-800">
      {/* Header Section - Modern Executive Style */}
      <div className="bg-gradient-to-b from-gray-50 to-white pb-6 mb-6 px-8 pt-8">
        <h1 className="text-4xl font-light text-center mb-2 tracking-wider uppercase">
          {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
        </h1>
        {personalInfo.title && (
          <p className="text-center text-lg text-gray-600 mb-4 font-light tracking-wide">{personalInfo.title}</p>
        )}

        {/* Contact Information - Horizontal layout */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 font-light border-t border-gray-200 pt-4">
          {personalInfo.location && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </a>
          )}
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:underline">
              <Phone className="w-3 h-3" />
              {formatPolishPhone(personalInfo.phone)}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <Globe className="w-3 h-3" />
              {formatLinkedinDisplay(personalInfo.linkedin)}
            </a>
          )}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 border-b-2 border-gray-900 pb-2 mb-4">
            {t('cv.professionalExperience')}
          </h2>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-base">
                    <span className="text-gray-900">{exp.position}</span> <span className="text-gray-400 font-light">|</span> <span className="font-bold text-gray-700">{exp.company}</span>
                  </h3>
                  <span className="text-sm text-gray-500 font-light">
                    {formatDate(exp.startDate)} – {exp.current ? t('cv.present') : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">{exp.location}</p>}
                <DescriptionList
                  description={exp.description}
                  className="text-sm leading-relaxed text-gray-700 font-light"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 border-b-2 border-gray-900 pb-2 mb-4">
              {t('cv.education')}
            </h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-base">
                      <span className="text-gray-900">{edu.degree}</span> <span className="font-bold text-gray-700">{edu.field}</span>
                    </h3>
                    <span className="text-sm text-gray-500 font-light">
                      {formatYear(edu.startDate)} – {formatYear(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-1 font-light">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Column Section for Skills and Languages */}
        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 border-b-2 border-gray-900 pb-2 mb-4">
              {t('cv.coreCompetencies')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 border-b-2 border-gray-900 pb-2 mb-4">
                {t('cv.languages')}
              </h2>
              <div className="space-y-1">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-gray-500 font-light">
                      {lang.proficiency === 'NATIVE' ? t('proficiency.NATIVE') : lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Interests - Optional, more subtle */}
        {interests.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 border-b-2 border-gray-900 pb-2 mb-4">
              {t('cv.interests')}
            </h2>
            <p className="text-sm text-gray-600 font-light">
              {interests.map((interest) => interest.name).join(' • ')}
            </p>
          </section>
        )}

        {/* GDPR Consent Clause */}
        {gdprConsent?.enabled && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 italic leading-relaxed font-light">
              {gdprConsent.companyName?.trim()
                ? t('cv.gdprConsent', { companyName: gdprConsent.companyName })
                : t('cv.gdprConsentGeneric')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
