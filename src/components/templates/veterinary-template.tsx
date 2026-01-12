import type { CVData } from '@/data/sample-cv-data';
import { Mail, Phone, Globe, MapPin, Stethoscope, Award, Heart, Briefcase } from 'lucide-react';
import { formatLinkedinDisplay, formatPolishPhone } from '@/lib/utils';
import { DescriptionList } from '@/components/description-list';

interface VeterinaryTemplateProps {
  data: CVData;
}

export function VeterinaryTemplate({ data }: VeterinaryTemplateProps) {
  const { personalInfo, experiences, education, skills, languages, interests } = data;

  return (
    <div className="bg-white font-['Lato'] text-gray-800">
      {/* Header Section - Medical/Veterinary Style */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-3 border-emerald-600 pb-6 pt-8 px-8">
        <div className="flex items-center justify-center mb-3">
          <div className="p-2 bg-emerald-100 rounded-full mr-3">
            <Stethoscope className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-['Merriweather'] font-light">
            Dr. <span className="font-bold">{personalInfo.firstName} {personalInfo.lastName}</span>
          </h1>
        </div>
        
        {personalInfo.title && (
          <p className="text-center text-lg text-emerald-700 mb-4 font-medium">{personalInfo.title}</p>
        )}
        
        {/* Contact Information - Clean layout */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.location && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <MapPin className="w-3 h-3 text-emerald-600" />
              {personalInfo.location}
            </a>
          )}
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Mail className="w-3 h-3 text-emerald-600" />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Phone className="w-3 h-3 text-emerald-600" />
              {formatPolishPhone(personalInfo.phone)}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Globe className="w-3 h-3 text-emerald-600" />
              {formatLinkedinDisplay(personalInfo.linkedin)}
            </a>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-[1fr,380px] gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Clinical Experience */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-['Merriweather'] font-bold text-emerald-700">
                  Clinical Experience
                </h2>
              </div>
              <div className="border-l-2 border-emerald-200 pl-4 space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[22px] w-3 h-3 bg-emerald-600 rounded-full border-2 border-white"></div>
                    <div className="mb-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {exp.position}
                      </h3>
                      <p className="text-emerald-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}{exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <DescriptionList
                      description={exp.description}
                      className="text-sm text-gray-700 leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Training */}
            {education.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-['Merriweather'] font-bold text-emerald-700">
                    Education & Training
                  </h2>
                </div>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-emerald-200 pl-4">
                      <h3 className="font-bold text-emerald-600">
                        {edu.degree} {edu.field}
                      </h3>
                      <p className="text-gray-700 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {formatYear(edu.startDate)} - {formatYear(edu.endDate)}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Skills & Additional Info */}
          <div className="space-y-6">
            {/* Clinical Skills */}
            <section className="bg-emerald-50 rounded-lg p-5">
              <h2 className="text-lg font-['Merriweather'] font-bold text-emerald-700 mb-4">
                Clinical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-emerald-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            {languages.length > 0 && (
              <section className="bg-teal-50 rounded-lg p-5">
                <h2 className="text-lg font-['Merriweather'] font-bold text-teal-700 mb-4">
                  Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{lang.language}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= (lang.proficiency === 'NATIVE' ? 5 : 
                                       lang.proficiency === 'C2' ? 5 :
                                       lang.proficiency === 'C1' ? 4 : 
                                       lang.proficiency === 'B2' ? 3 :
                                       lang.proficiency === 'B1' ? 2 :
                                       lang.proficiency === 'A2' ? 2 : 1)
                                ? 'bg-teal-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Special Interests */}
            {interests.length > 0 && (
              <section className="bg-orange-50 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-orange-600" />
                  <h2 className="text-lg font-['Merriweather'] font-bold text-orange-700">
                    Special Interests
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-3 py-1.5 rounded-full text-sm font-medium"
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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function formatYear(dateString: string): string {
  if (!dateString) return '';
  const [year] = dateString.split('-');
  return year;
}