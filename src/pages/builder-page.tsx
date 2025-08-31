import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { languageLevels } from '@/lib/language-levels';
import type {
  EducationProps,
  ExperienceProps,
  InterestProps,
  LanguageLevelProps,
  LanguageProps,
  PersonalInfoProps,
  SkillProps,
} from '@/types/form-types';
import { useForm } from '@tanstack/react-form';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link, useSearch } from '@tanstack/react-router';

interface BuilderPageProps {
  templateId?: string;
}

const BuilderPage = ({ templateId = 'modern' }: BuilderPageProps) => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/builder' }) as { templateId?: string; edit?: boolean };
  const isEditMode = search.edit === true;
  
  // Use search param if available, otherwise fall back to prop
  const activeTemplateId = search.templateId || templateId;
  
  // Get initial values - either from localStorage in edit mode or defaults
  const getInitialValues = () => {
    if (isEditMode) {
      const storedData = localStorage.getItem('cvData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        return {
          ...parsedData,
          templateId: parsedData.templateId || activeTemplateId,
        };
      }
    }
    
    // Return default values for new CV
    return {
      templateId: activeTemplateId,
      personalInfo: {
        firstName: '',
        lastName: '',
        location: '',
        title: '',
        phone: '',
        email: '',
        website: '',
        linkedin: '',
        github: '',
      } as PersonalInfoProps,
      experiences: [] as ExperienceProps[],
      education: [] as EducationProps[],
      skills: [] as SkillProps[],
      languages: [] as LanguageProps[],
      interests: [] as InterestProps[],
    };
  };
  
  const form = useForm({
    defaultValues: getInitialValues(),
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
      // Store data in localStorage for persistence
      localStorage.setItem('cvData', JSON.stringify(value));
      // Navigate to preview page with templateId
      navigate({ to: '/preview', search: { templateId: value.templateId } });
    },
  });

  const addExperience = () => {
    form.setFieldValue('experiences', [
      ...form.getFieldValue('experiences'),
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
    const experiences = form.getFieldValue('experiences');
    form.setFieldValue(
      'experiences',
      experiences.filter((_: ExperienceProps, i: number) => i !== index)
    );
  };

  const addEducation = () => {
    form.setFieldValue('education', [
      ...form.getFieldValue('education'),
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
    const education = form.getFieldValue('education');
    form.setFieldValue(
      'education',
      education.filter((_: EducationProps, i: number) => i !== index)
    );
  };

  const addSkill = () => {
    form.setFieldValue('skills', [...form.getFieldValue('skills'), { name: '' }]);
  };

  const removeSkill = (index: number) => {
    const skills = form.getFieldValue('skills');
    form.setFieldValue(
      'skills',
      skills.filter((_: SkillProps, i: number) => i !== index)
    );
  };

  const addLanguage = () => {
    form.setFieldValue('languages', [
      ...form.getFieldValue('languages'),
      { language: '', proficiency: 'A1' as LanguageLevelProps },
    ]);
  };

  const removeLanguage = (index: number) => {
    const languages = form.getFieldValue('languages');
    form.setFieldValue(
      'languages',
      languages.filter((_: LanguageProps, i: number) => i !== index)
    );
  };

  const addInterest = () => {
    form.setFieldValue('interests', [...form.getFieldValue('interests'), { name: '' }]);
  };

  const removeInterest = (index: number) => {
    const interests = form.getFieldValue('interests');
    form.setFieldValue(
      'interests',
      interests.filter((_: InterestProps, i: number) => i !== index)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/templates">
                <Button variant="outline" size="sm" type="button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Build Your CV</h1>
            </div>
            <div className="text-sm text-gray-600">
              Template: <span className="font-medium capitalize">{activeTemplateId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* personal-info-section */}
          <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic contact information and professional summary</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='personalInfo.firstName'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>First Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.lastName'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Last Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.location'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>location</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.title'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Professional Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.phone'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Phone</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='tel'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.email'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='email'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.website'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Website</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.linkedin'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>LinkedIn</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.github'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>GitHub</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* experience-section */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Add your professional experience</CardDescription>
          <Button type='button' onClick={addExperience}>
            Add Experience
          </Button>
        </CardHeader>
        <CardContent>
          <form.Field name='experiences'>
            {(field) => (
              <div className='space-y-4'>
                {field.state.value.map((_: ExperienceProps, index: number) => (
                  <div key={index} className='border p-4 rounded-lg space-y-4'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-medium'>Experience {index + 1}</h4>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    <form.Field name={`experiences[${index}].company`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Company</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].position`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Position</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].startDate`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Start Date</Label>
                          <DatePicker
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onChange={(date) =>
                              subField.handleChange(date ? date.toISOString() : '')
                            }
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].endDate`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>End Date</Label>
                          <DatePicker
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onChange={(date) =>
                              subField.handleChange(date ? date.toISOString() : '')
                            }
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].current`}>
                      {(subField) => (
                        <div className='flex items-center space-x-2'>
                          <Checkbox
                            id={subField.name}
                            name={subField.name}
                            checked={subField.state.value}
                            onCheckedChange={(checked) => subField.handleChange(!!checked)}
                          />
                          <Label htmlFor={subField.name}>Currently working here</Label>
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].description`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Description</Label>
                          <Textarea
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* education-section */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
          <Button type='button' onClick={addEducation}>
            Add Education
          </Button>
        </CardHeader>
        <CardContent>
          <form.Field name='education'>
            {(field) => (
              <div className='space-y-4'>
                {field.state.value.map((_: EducationProps, index: number) => (
                  <div key={index} className='border p-4 rounded-lg space-y-4'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-medium'>Education {index + 1}</h4>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => removeEducation(index)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    <form.Field name={`education[${index}].institution`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Institution</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].degree`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Degree</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].field`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Field of Study</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].startDate`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Start Date</Label>
                          <DatePicker
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onChange={(date) =>
                              subField.handleChange(date ? date.toISOString() : '')
                            }
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].endDate`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>End Date</Label>
                          <DatePicker
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onChange={(date) =>
                              subField.handleChange(date ? date.toISOString() : '')
                            }
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].description`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Description</Label>
                          <Textarea
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* skills-section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Add your professional skills</CardDescription>
          <Button type='button' onClick={addSkill}>
            Add Skill
          </Button>
        </CardHeader>
        <CardContent>
          <form.Field name='skills'>
            {(field) => (
              <div className='space-y-2'>
                {field.state.value.map((_: SkillProps, index: number) => (
                  <div key={index} className='flex gap-2'>
                    <form.Field name={`skills[${index}].name`}>
                      {(subField) => (
                        <Input
                          placeholder='Enter skill'
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeSkill(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* languages-section */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Add languages you speak</CardDescription>
          <Button type='button' onClick={addLanguage}>
            Add Language
          </Button>
        </CardHeader>
        <CardContent>
          <form.Field name='languages'>
            {(field) => (
              <div className='space-y-4'>
                {field.state.value.map((_: LanguageProps, index: number) => (
                  <div key={index} className='border p-4 rounded-lg space-y-4'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-medium'>Language {index + 1}</h4>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => removeLanguage(index)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    <form.Field name={`languages[${index}].language`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Language</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`languages[${index}].proficiency`}>
                      {(subField) => (
                        <div>
                          <Label htmlFor={subField.name}>Proficiency</Label>
                          <Select
                            value={subField.state.value}
                            onValueChange={(value) =>
                              subField.handleChange(value as LanguageLevelProps)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Select proficiency' />
                            </SelectTrigger>
                            <SelectContent>
                              {languageLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* interests-section */}
      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
          <CardDescription>Add your personal interests and hobbies</CardDescription>
          <Button type='button' onClick={addInterest}>
            Add Interest
          </Button>
        </CardHeader>
        <CardContent>
          <form.Field name='interests'>
            {(field) => (
              <div className='space-y-2'>
                {field.state.value.map((_: InterestProps, index: number) => (
                  <div key={index} className='flex gap-2'>
                    <form.Field name={`interests[${index}].name`}>
                      {(subField) => (
                        <Input
                          placeholder='Enter interest'
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) => subField.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeInterest(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type='submit' disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default BuilderPage;
