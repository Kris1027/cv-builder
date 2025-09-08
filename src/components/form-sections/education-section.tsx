import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { EducationProps } from '@/types/form-types';
import { Trash2, Plus, GraduationCap } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';

interface EducationSectionProps {
  form: FormApi;
  addEducation: () => void;
  removeEducation: (index: number) => void;
}

export const EducationSection = ({ form, addEducation, removeEducation }: EducationSectionProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-xl">Education</CardTitle>
            </div>
            <CardDescription className="mt-1">Add your educational background</CardDescription>
          </div>
          <Button 
            type='button' 
            onClick={addEducation}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form.Field name='education'>
          {(field) => (
            <div className='space-y-6'>
              {field.state.value.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No education added yet</p>
                  <p className="text-sm mt-1">Click "Add Education" to get started</p>
                </div>
              )}
              {field.state.value.map((_: EducationProps, index: number) => (
                <div key={index} className='bg-gradient-to-r from-purple-50/50 to-white p-6 rounded-xl space-y-4 border border-gray-200 hover:shadow-md transition-shadow'>
                  <div className='flex justify-between items-center mb-4'>
                    <h4 className='font-semibold text-lg text-gray-700'>Education {index + 1}</h4>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeEducation(index)}
                      className='text-red-500 hover:text-red-700 hover:bg-red-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <form.Field name={`education[${index}].institution`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Institution</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='University Name'
                            className='focus:ring-purple-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].degree`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Degree</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='Bachelor of Science'
                            className='focus:ring-purple-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`education[${index}].field`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Field of Study</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='Computer Science'
                            className='focus:ring-purple-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <div className='grid grid-cols-2 gap-2'>
                      <form.Field name={`education[${index}].startDate`}>
                        {(subField) => (
                          <div className='space-y-2'>
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
                          <div className='space-y-2'>
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
                    </div>
                  </div>

                  <form.Field name={`education[${index}].description`}>
                    {(subField) => (
                      <div className='space-y-2'>
                        <Label htmlFor={subField.name}>Description (Optional)</Label>
                        <Textarea
                          id={subField.name}
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) => subField.handleChange(e.target.value)}
                          placeholder='GPA, relevant coursework, achievements...'
                          className='focus:ring-purple-500 min-h-[100px] resize-none'
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
  );
};