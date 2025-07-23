import { useState } from 'react';
import { useCVData } from '../contexts';
import type { CVData } from '../types';

export function CVForm() {
  const { cvData, setCVData, setCurrentView } = useCVData();
  const [formData, setFormData] = useState<CVData>(cvData);
  const [skillsText, setSkillsText] = useState<string>(cvData.skills.join(', '));
  const [interestsText, setInterestsText] = useState<string>(cvData.interests.join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCVData(formData);
    setCurrentView('userCV');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleInputChange = (field: keyof CVData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleJobChange = (index: number, field: string, value: any) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[index] = { ...updatedJobs[index], [field]: value };
    setFormData(prev => ({ ...prev, jobs: updatedJobs }));
  };

  const handleJobTaskChange = (jobIndex: number, taskIndex: number, value: string) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[jobIndex].tasks[taskIndex] = value;
    setFormData(prev => ({ ...prev, jobs: updatedJobs }));
  };

  const addJob = () => {
    setFormData(prev => ({
      ...prev,
      jobs: [...prev.jobs, {
        company: '',
        position: '',
        period: '',
        location: '',
        tasks: ['']
      }]
    }));
  };

  const removeJob = (index: number) => {
    setFormData(prev => ({
      ...prev,
      jobs: prev.jobs.filter((_, i) => i !== index)
    }));
  };

  const addTask = (jobIndex: number) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[jobIndex].tasks.push('');
    setFormData(prev => ({ ...prev, jobs: updatedJobs }));
  };

  const removeTask = (jobIndex: number, taskIndex: number) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[jobIndex].tasks = updatedJobs[jobIndex].tasks.filter((_, i) => i !== taskIndex);
    setFormData(prev => ({ ...prev, jobs: updatedJobs }));
  };

  const handleSkillsChange = (value: string) => {
    setSkillsText(value);
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleInterestsChange = (value: string) => {
    setInterestsText(value);
    const interests = value.split(',').map(interest => interest.trim()).filter(interest => interest);
    setFormData(prev => ({ ...prev, interests }));
  };

  const handleLanguageChange = (index: number, field: 'name' | 'level', value: string) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData(prev => ({ ...prev, languages: updatedLanguages }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { name: '', level: '' }]
    }));
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
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
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
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

        {/* Work Experience */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Work Experience</h2>
            <button
              type="button"
              onClick={addJob}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Add Job
            </button>
          </div>
          
          {formData.jobs.map((job, jobIndex) => (
            <div key={jobIndex} className="mb-6 p-4 bg-white rounded-md border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">Job {jobIndex + 1}</h3>
                {formData.jobs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeJob(jobIndex)}
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
                    onChange={(e) => handleJobChange(jobIndex, 'company', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={job.position}
                    onChange={(e) => handleJobChange(jobIndex, 'position', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                  <input
                    type="text"
                    value={job.period}
                    onChange={(e) => handleJobChange(jobIndex, 'period', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., January 2023 - Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={job.location}
                    onChange={(e) => handleJobChange(jobIndex, 'location', e.target.value)}
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
                    onClick={() => addTask(jobIndex)}
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
                      onChange={(e) => handleJobTaskChange(jobIndex, taskIndex, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your responsibility or achievement"
                    />
                    {job.tasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTask(jobIndex, taskIndex)}
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={formData.education.profile}
                onChange={(e) => handleInputChange('education', { ...formData.education, profile: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Field of study"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <input
                type="text"
                value={formData.education.period}
                onChange={(e) => handleInputChange('education', { ...formData.education, period: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2016 - 2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={formData.education.location}
                onChange={(e) => handleInputChange('education', { ...formData.education, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="University/Institution name"
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Skills</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma-separated)
            </label>
            <textarea
              value={skillsText}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="List your skills separated by commas"
            />
          </div>
        </section>

        {/* Languages */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Languages</h2>
            <button
              type="button"
              onClick={addLanguage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Add Language
            </button>
          </div>
          
          {formData.languages.map((language, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Language name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={language.level}
                  onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
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
              {formData.languages.length > 1 && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Interests</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests (comma-separated)
            </label>
            <textarea
              value={interestsText}
              onChange={(e) => handleInterestsChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="List your interests separated by commas"
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Generate CV
          </button>
        </div>
      </form>
    </div>
  );
}