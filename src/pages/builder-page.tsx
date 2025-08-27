import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';

const BuilderPage = () => {
  const form = useForm({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
      },
      experience: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
      education: [
        {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      skillsPlaceholder: '', // We'll manage skills separately
      languages: [
        {
          language: '',
          proficiency: 'Beginner',
        },
      ],
    },
    onSubmit: async ({ value }) => {
      const finalData = {
        ...value,
        skills: skills,
        interests: interests,
      };
      console.log('CV Data:', finalData);
      // TODO: Handle CV generation/download
    },
  });

  const addExperience = () => {
    form.setFieldValue('experience', [
      ...form.state.values.experience,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ]);
  };

  const removeExperience = (index: number) => {
    form.setFieldValue(
      'experience',
      form.state.values.experience.filter((_, i) => i !== index)
    );
  };

  const addEducation = () => {
    form.setFieldValue('education', [
      ...form.state.values.education,
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    form.setFieldValue(
      'education',
      form.state.values.education.filter((_, i) => i !== index)
    );
  };

  const addLanguage = () => {
    form.setFieldValue('languages', [
      ...form.state.values.languages,
      {
        language: '',
        proficiency: 'Beginner',
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    form.setFieldValue(
      'languages',
      form.state.values.languages.filter((_, i) => i !== index)
    );
  };

  const [skillInput, setSkillInput] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>([]);
  const [interestInput, setInterestInput] = React.useState('');
  const [interests, setInterests] = React.useState<string[]>([]);

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addInterest = (interest: string) => {
    if (interest.trim() && !interests.includes(interest.trim())) {
      setInterests([...interests, interest.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Build Your CV</h1>
          <p className="text-muted-foreground">Fill in your details to create a professional CV</p>
        </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your basic contact information and professional summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="personalInfo.firstName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'First name is required' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label className="text-sm font-medium" htmlFor={field.name}>
                      First Name *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="personalInfo.lastName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Last name is required' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label className="text-sm font-medium" htmlFor={field.name}>
                      Last Name *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="personalInfo.email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                      return 'Invalid email address';
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label className="text-sm font-medium" htmlFor={field.name}>
                      Email *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field name="personalInfo.phone">
                {(field) => (
                  <div>
                    <label className="text-sm font-medium" htmlFor={field.name}>
                      Phone
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="personalInfo.location">
              {(field) => (
                <div>
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    Location
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="City, Country"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="personalInfo.title"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Professional title is required' : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    Professional Title *
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {field.state.meta.errors ? (
                    <p className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="personalInfo.summary">
              {(field) => (
                <div>
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    Professional Summary
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                    placeholder="Brief overview of your professional background and goals..."
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>
              Add your professional experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {form.state.values.experience.map((_, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  {form.state.values.experience.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field name={`experience[${index}].company`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          Company
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`experience[${index}].position`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          Position
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field name={`experience[${index}].startDate`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          Start Date
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type="month"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>

                  <div className="space-y-2">
                    <form.Field name={`experience[${index}].current`}>
                      {(field) => (
                        <div className="flex items-center">
                          <input
                            id={field.name}
                            name={field.name}
                            type="checkbox"
                            checked={field.state.value}
                            onChange={(e) => field.handleChange(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor={field.name} className="text-sm">
                            Current position
                          </label>
                        </div>
                      )}
                    </form.Field>

                    {!form.state.values.experience[index].current && (
                      <form.Field name={`experience[${index}].endDate`}>
                        {(field) => (
                          <div>
                            <label className="text-sm font-medium" htmlFor={field.name}>
                              End Date
                            </label>
                            <input
                              id={field.name}
                              name={field.name}
                              type="month"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </form.Field>
                    )}
                  </div>
                </div>

                <form.Field name={`experience[${index}].description`}>
                  {(field) => (
                    <div>
                      <label className="text-sm font-medium" htmlFor={field.name}>
                        Description
                      </label>
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={3}
                        placeholder="Describe your responsibilities and achievements..."
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addExperience}
              className="w-full"
            >
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>
              Add your educational background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {form.state.values.education.map((_, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {form.state.values.education.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field name={`education[${index}].institution`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          Institution
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`education[${index}].degree`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          Degree
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., Bachelor's, Master's"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field name={`education[${index}].field`}>
                  {(field) => (
                    <div>
                      <label className="text-sm font-medium" htmlFor={field.name}>
                        Field of Study
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., Computer Science"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field name={`education[${index}].startDate`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          Start Date
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type="month"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`education[${index}].endDate`}>
                    {(field) => (
                      <div>
                        <label className="text-sm font-medium" htmlFor={field.name}>
                          End Date
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type="month"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field name={`education[${index}].description`}>
                  {(field) => (
                    <div>
                      <label className="text-sm font-medium" htmlFor={field.name}>
                        Description
                      </label>
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={2}
                        placeholder="Notable achievements, GPA, relevant coursework..."
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addEducation}
              className="w-full"
            >
              Add Education
            </Button>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>
              Add your professional skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addSkill(skillInput)}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                >
                  <span className="text-sm">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-gray-500 hover:text-red-500 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
            <CardDescription>
              Add your hobbies and interests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter an interest and press Enter"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest(interestInput);
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addInterest(interestInput)}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                >
                  <span className="text-sm">{interest}</span>
                  <button
                    type="button"
                    onClick={() => removeInterest(index)}
                    className="text-gray-500 hover:text-red-500 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>
              Add languages you speak
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.state.values.languages.map((_, index) => (
              <div key={index} className="flex gap-4 items-end">
                <form.Field name={`languages[${index}].language`}>
                  {(field) => (
                    <div className="flex-1">
                      <label className="text-sm font-medium" htmlFor={field.name}>
                        Language
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name={`languages[${index}].proficiency`}>
                  {(field) => (
                    <div className="flex-1">
                      <label className="text-sm font-medium" htmlFor={field.name}>
                        Proficiency
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                  )}
                </form.Field>

                {form.state.values.languages.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addLanguage}
              className="w-full"
            >
              Add Language
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                disabled={state.isSubmitting || !state.canSubmit}
                className="flex-1"
              >
                {state.isSubmitting ? 'Generating CV...' : 'Generate CV'}
              </Button>
            )}
          </form.Subscribe>
          <Button type="button" variant="outline" className="flex-1">
            Preview
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default BuilderPage;