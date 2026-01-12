import type { CVData } from '@/data/sample-cv-data';
import { Mail, Phone, Globe, MapPin, Github, Linkedin } from 'lucide-react';
import { formatWebsiteDisplay, formatGithubDisplay, formatLinkedinDisplay, formatPolishPhone } from '@/lib/utils';
import { DescriptionList } from '@/components/description-list';

interface ModernTemplateProps {
  data: CVData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experiences, education, skills, languages, interests } = data;

  return (
    <div className="bg-white font-['JetBrains_Mono'] text-gray-800">
      {/* Header Section - Developer Style */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xl mb-4 opacity-95 font-normal">{personalInfo.title}</p>
        )}
        
        <div className="flex flex-wrap gap-6 mt-4 text-sm font-normal">
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Globe className="w-4 h-4" />
              <span>{formatWebsiteDisplay(personalInfo.website)}</span>
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Github className="w-4 h-4" />
              <span>{formatGithubDisplay(personalInfo.github)}</span>
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Linkedin className="w-4 h-4" />
              <span>{formatLinkedinDisplay(personalInfo.linkedin)}</span>
            </a>
          )}
        </div>
        
        <div className="flex flex-wrap gap-6 mt-2 text-sm font-normal">
          {personalInfo.location && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </a>
          )}
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:underline">
              <Phone className="w-4 h-4" />
              <span>{formatPolishPhone(personalInfo.phone)}</span>
            </a>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-[1fr,400px] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Work Experience */}
            <section>
              <h2 className="text-xl font-semibold text-purple-600 border-b-2 border-purple-600 pb-2 mb-4">
                // WORK EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {exp.company} <span className="text-purple-600">| {exp.position}</span>
                        </h3>
                        <p className="text-gray-600 text-sm font-light">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}{exp.location && ` | ${exp.location}`}
                        </p>
                      </div>
                    </div>
                    <DescriptionList
                      description={exp.description}
                      className="text-gray-700 text-sm leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-purple-600 border-b-2 border-purple-600 pb-2 mb-4">
                  // EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg text-purple-600">
                        {edu.field}
                      </h3>
                      <p className="text-gray-700">
                        {formatYear(edu.startDate)} - {formatYear(edu.endDate)} | {edu.institution}
                      </p>
                      {edu.description && (
                        <p className="text-gray-700 text-sm mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <section>
              <h2 className="text-xl font-semibold text-purple-600 border-b-2 border-purple-600 pb-2 mb-4">
                // TECH STACK
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-900 text-green-400 px-3 py-1 rounded text-sm font-medium border border-gray-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-purple-600 border-b-2 border-purple-600 pb-2 mb-4">
                  // LANGUAGES
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{lang.language}</span>
                      <span className="text-purple-600">
                        {lang.proficiency === 'NATIVE' ? 'Native' : lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {interests.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-purple-600 border-b-2 border-purple-600 pb-2 mb-4">
                  // INTERESTS
                </h2>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {interest.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function formatYear(dateString: string): string {
  if (!dateString) return '';
  const [year] = dateString.split('-');
  return year;
}