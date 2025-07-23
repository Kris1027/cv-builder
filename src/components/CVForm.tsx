import { useState } from 'react';
import { useCVData } from '../contexts';
import type { CVData, Language } from '../types';

export function CVForm() {
  const { cvData, setCVData, setCurrentView } = useCVData();
  const [formData, setFormData] = useState<CVData>(cvData);
  const [skillsText, setSkillsText] = useState<Record<Language, string>>({
    en: cvData.content.en.skills.join(', '),
    pl: cvData.content.pl.skills.join(', ')
  });
  const [interestsText, setInterestsText] = useState<Record<Language, string>>({
    en: cvData.content.en.interests.join(', '),
    pl: cvData.content.pl.interests.join(', ')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.selectedLanguages.length === 0) {
      alert('Please select at least one language version for your CV.');
      return;
    }
    
    setCVData(formData);
    setCurrentView('userCV');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleInputChange = (field: keyof CVData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (language: Language, section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          [section]: {
            ...(prev.content[language] as any)[section],
            [field]: value
          }
        }
      }
    }));
  };

  const handleJobChange = (language: Language, jobIndex: number, field: string, value: any) => {
    setFormData(prev => {
      const updatedJobs = [...prev.content[language].jobs];
      updatedJobs[jobIndex] = { ...updatedJobs[jobIndex], [field]: value };
      return {
        ...prev,
        content: {
          ...prev.content,
          [language]: {
            ...prev.content[language],
            jobs: updatedJobs
          }
        }
      };
    });
  };

  const handleJobTaskChange = (language: Language, jobIndex: number, taskIndex: number, value: string) => {
    setFormData(prev => {
      const updatedJobs = [...prev.content[language].jobs];
      updatedJobs[jobIndex].tasks[taskIndex] = value;
      return {
        ...prev,
        content: {
          ...prev.content,
          [language]: {
            ...prev.content[language],
            jobs: updatedJobs
          }
        }
      };
    });
  };

  const addJob = (language: Language) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          jobs: [...prev.content[language].jobs, {
            company: '',
            position: '',
            period: '',
            location: '',
            tasks: ['']
          }]
        }
      }
    }));
  };

  const removeJob = (language: Language, index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          jobs: prev.content[language].jobs.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const addTask = (language: Language, jobIndex: number) => {
    setFormData(prev => {
      const updatedJobs = [...prev.content[language].jobs];
      updatedJobs[jobIndex].tasks.push('');
      return {
        ...prev,
        content: {
          ...prev.content,
          [language]: {
            ...prev.content[language],
            jobs: updatedJobs
          }
        }
      };
    });
  };

  const removeTask = (language: Language, jobIndex: number, taskIndex: number) => {
    setFormData(prev => {
      const updatedJobs = [...prev.content[language].jobs];
      updatedJobs[jobIndex].tasks = updatedJobs[jobIndex].tasks.filter((_, i) => i !== taskIndex);
      return {
        ...prev,
        content: {
          ...prev.content,
          [language]: {
            ...prev.content[language],
            jobs: updatedJobs
          }
        }
      };
    });
  };

  const handleSkillsChange = (language: Language, value: string) => {
    setSkillsText(prev => ({ ...prev, [language]: value }));
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          skills
        }
      }
    }));
  };

  const handleInterestsChange = (language: Language, value: string) => {
    setInterestsText(prev => ({ ...prev, [language]: value }));
    const interests = value.split(',').map(interest => interest.trim()).filter(interest => interest);
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          interests
        }
      }
    }));
  };

  const handleLanguageChange = (language: Language, index: number, field: 'name' | 'level', value: string) => {
    setFormData(prev => {
      const updatedLanguages = [...prev.content[language].languages];
      updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
      return {
        ...prev,
        content: {
          ...prev.content,
          [language]: {
            ...prev.content[language],
            languages: updatedLanguages
          }
        }
      };
    });
  };

  const addLanguage = (language: Language) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          languages: [...prev.content[language].languages, { name: '', level: '' }]
        }
      }
    }));
  };

  const removeLanguage = (language: Language, index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [language]: {
          ...prev.content[language],
          languages: prev.content[language].languages.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const renderLanguageForm = (language: Language) => {
    const languageName = language === 'en' ? 'English' : 'Polish';
    const content = formData.content[language];

    return (
      <div key={language} className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
          {languageName} Version
        </h3>

        {/* Work Experience */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Work Experience</h4>
            <button
              type="button"
              onClick={() => addJob(language)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Add Job
            </button>
          </div>
          
          {content.jobs.map((job, jobIndex) => (
            <div key={jobIndex} className="mb-6 p-4 bg-white rounded-md border">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-medium text-gray-700">Job {jobIndex + 1}</h5>
                {content.jobs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeJob(language, jobIndex)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => handleJobChange(language, jobIndex, 'company', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={job.position}
                    onChange={(e) => handleJobChange(language, jobIndex, 'position', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                  <input
                    type="text"
                    value={job.period}
                    onChange={(e) => handleJobChange(language, jobIndex, 'period', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., January 2023 - Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={job.location}
                    onChange={(e) => handleJobChange(language, jobIndex, 'location', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, State/Country"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Tasks/Responsibilities</label>
                  <button
                    type="button"
                    onClick={() => addTask(language, jobIndex)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Add Task
                  </button>
                </div>
                {job.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => handleJobTaskChange(language, jobIndex, taskIndex, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your responsibility or achievement"
                    />
                    {job.tasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTask(language, jobIndex, taskIndex)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Education</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={content.education.profile}
                onChange={(e) => handleContentChange(language, 'education', 'profile', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Field of study"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <input
                type="text"
                value={content.education.period}
                onChange={(e) => handleContentChange(language, 'education', 'period', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2016 - 2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={content.education.location}
                onChange={(e) => handleContentChange(language, 'education', 'location', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="University/Institution name"
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Skills</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma-separated)
            </label>
            <textarea
              value={skillsText[language]}
              onChange={(e) => handleSkillsChange(language, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="List your skills separated by commas"
            />
          </div>
        </section>

        {/* Languages */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Languages</h4>
            <button
              type="button"
              onClick={() => addLanguage(language)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Add Language
            </button>
          </div>
          
          {content.languages.map((lang, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => handleLanguageChange(language, index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Language name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={lang.level}
                  onChange={(e) => handleLanguageChange(language, index, 'level', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select level</option>
                  <option value="Native">Native</option>
                  <option value="C2">C2</option>
                  <option value="C1">C1</option>
                  <option value="B2">B2</option>
                  <option value="B1">B1</option>
                  <option value="A2">A2</option>
                  <option value="A1">A1</option>
                </select>
              </div>
              {content.languages.length > 1 && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeLanguage(language, index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Interests */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Interests</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests (comma-separated)
            </label>
            <textarea
              value={interestsText[language]}
              onChange={(e) => handleInterestsChange(language, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="List your interests separated by commas"
            />
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBackToMenu}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Menu
        </button>
        <h1 className="text-3xl font-bold text-gray-800">CV Builder</h1>
        <div className="w-24"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Language Selection */}
        <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">CV Language Options</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">Choose which language versions you want to create:</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.selectedLanguages.includes('en')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        selectedLanguages: [...prev.selectedLanguages, 'en']
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        selectedLanguages: prev.selectedLanguages.filter(lang => lang !== 'en')
                      }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">English Version</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.selectedLanguages.includes('pl')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        selectedLanguages: [...prev.selectedLanguages, 'pl']
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        selectedLanguages: prev.selectedLanguages.filter(lang => lang !== 'pl')
                      }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Polish Version</span>
              </label>
            </div>
            {formData.selectedLanguages.length === 0 && (
              <p className="text-red-500 text-sm">Please select at least one language version.</p>
            )}
          </div>
        </section>

        {/* Personal Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your website domain"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Username</label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your GitHub username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Username</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your LinkedIn username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.linkedin.com/in/yourusername/"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your phone number"
              />
            </div>
          </div>
        </section>

        {/* Language-specific forms */}
        {formData.selectedLanguages.map((language) => (
          <section key={language} className="bg-white p-6 rounded-lg border-2 border-gray-200">
            {renderLanguageForm(language)}
          </section>
        ))}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={formData.selectedLanguages.length === 0}
            className={`px-8 py-3 font-semibold rounded-md focus:ring-2 focus:ring-offset-2 transition-colors ${
              formData.selectedLanguages.length === 0
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            Generate CV
            {formData.selectedLanguages.length > 1 && (
              <span className="ml-2 text-sm">
                ({formData.selectedLanguages.length} languages)
              </span>
            )}
          </button>
          {formData.selectedLanguages.length === 0 && (
            <p className="text-red-500 text-sm mt-2">Please select at least one language version above</p>
          )}
        </div>
      </form>
    </div>
  );
}