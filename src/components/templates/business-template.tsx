import type { CVData } from '@/data/sample-cv-data';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface BusinessTemplateProps {
  data: CVData;
}

export function BusinessTemplate({ data }: BusinessTemplateProps) {
  const { personalInfo, experiences, education, skills, languages, interests } = data;

  return (
    <div className="bg-white max-w-[210mm] mx-auto font-serif">
      {/* Header Section - More formal and traditional */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6 px-8 pt-8">
        <h1 className="text-4xl font-bold text-center mb-2 tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-center text-lg text-gray-700 mb-4">{personalInfo.title}</p>
        )}
        
        {/* Contact Information - Horizontal layout */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">
                    {exp.position} | {exp.company}
                  </h3>
                  <span className="text-sm text-gray-600 italic">
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{personalInfo.location}</p>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-4">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">
                      {edu.degree} in {edu.field}
                    </h3>
                    <span className="text-sm text-gray-600 italic">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
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
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-4">
              Core Competencies
            </h2>
            <div className="text-sm">
              {skills.map((skill, index) => (
                <span key={index}>
                  {skill.name}
                  {index < skills.length - 1 && ' • '}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-4">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{lang.language}</span>
                    <span className="text-gray-600">
                      {lang.proficiency === 'NATIVE' ? 'Native' : lang.proficiency}
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
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-4">
              Interests
            </h2>
            <p className="text-sm text-gray-700">
              {interests.map((interest) => interest.name).join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}