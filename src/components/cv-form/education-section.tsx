import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { useState } from 'react';
import type { Education } from '@/types/form-types';

export const EducationSection = () => {
  const [education, setEducation] = useState<Education[]>([
    {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

  // Education handlers
  const addEducation = () => {
    setEducation([
      ...education,
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
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setEducation(updatedEducation);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {education.map((edu, index) => (
          <div key={index} className='p-4 border rounded-lg space-y-4'>
            <div className='flex justify-between items-start'>
              <h4 className='font-medium'>Education {index + 1}</h4>
              {education.length > 1 && (
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  onClick={() => removeEducation(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor={`education-${index}-institution`}>Institution</Label>
                <Input
                  id={`education-${index}-institution`}
                  value={edu.institution || ''}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`education-${index}-degree`}>Degree</Label>
                <Input
                  id={`education-${index}-degree`}
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="e.g., Bachelor's, Master's"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`education-${index}-field`}>Field of Study</Label>
              <Input
                id={`education-${index}-field`}
                value={edu.field || ''}
                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                placeholder='e.g., Computer Science'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor={`education-${index}-startDate`}>Start Date</Label>
                <DatePicker
                  id={`education-${index}-startDate`}
                  value={edu.startDate || ''}
                  onChange={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      updateEducation(index, 'startDate', `${year}-${month}`);
                    } else {
                      updateEducation(index, 'startDate', '');
                    }
                  }}
                  placeholder='Select start date'
                />
              </div>

              <div>
                <Label htmlFor={`education-${index}-endDate`}>End Date</Label>
                <DatePicker
                  id={`education-${index}-endDate`}
                  value={edu.endDate || ''}
                  onChange={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      updateEducation(index, 'endDate', `${year}-${month}`);
                    } else {
                      updateEducation(index, 'endDate', '');
                    }
                  }}
                  placeholder='Select end date'
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`education-${index}-description`}>Description</Label>
              <Textarea
                id={`education-${index}-description`}
                value={edu.description || ''}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
                rows={2}
                placeholder='Notable achievements, GPA, relevant coursework...'
              />
            </div>
          </div>
        ))}

        <Button type='button' variant='outline' onClick={addEducation} className='w-full'>
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};
