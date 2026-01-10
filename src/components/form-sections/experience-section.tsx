import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ExperienceProps } from '@/types/form-types';
import { Trash2, Plus, Briefcase } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';

interface ExperienceSectionProps {
  form: FormApi;
  addExperience: () => void;
  removeExperience: (index: number) => void;
}

export const ExperienceSection = ({ form, addExperience, removeExperience }: ExperienceSectionProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-xl dark:text-gray-100">Work Experience</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">Add your professional experience</CardDescription>
          </div>
          <Button 
            type='button' 
            onClick={addExperience}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form.Field name='experiences'>
          {(field) => (
            <div className='space-y-6'>
              {field.state.value.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No experience added yet</p>
                  <p className="text-sm mt-1">Click "Add Experience" to get started</p>
                </div>
              )}
              {field.state.value.map((_: ExperienceProps, index: number) => (
                <div key={index} className='bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 p-6 rounded-xl space-y-4 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow'>
                  <div className='flex justify-between items-center mb-4'>
                    <h4 className='font-semibold text-lg text-gray-700 dark:text-gray-300'>Experience {index + 1}</h4>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeExperience(index)}
                      className='text-red-500 hover:text-red-700 hover:bg-red-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <form.Field name={`experiences[${index}].company`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Company</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='Company Name'
                            className='focus:ring-green-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].position`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Position</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='Job Title'
                            className='focus:ring-green-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].location`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Location</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='City, Country'
                            className='focus:ring-green-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`experiences[${index}].startDate`}>
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

                    <form.Field name={`experiences[${index}].endDate`}>
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
                            disabled={form.getFieldValue(`experiences[${index}].current`)}
                          />
                        </div>
                      )}
                    </form.Field>
                  </div>

                  <form.Field name={`experiences[${index}].current`}>
                    {(subField) => (
                      <div className='flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                        <Checkbox
                          id={subField.name}
                          name={subField.name}
                          checked={subField.state.value}
                          onCheckedChange={(checked) => subField.handleChange(!!checked)}
                          className='border-blue-400'
                        />
                        <Label htmlFor={subField.name} className='text-blue-700 dark:text-blue-400 cursor-pointer'>
                          Currently working here
                        </Label>
                      </div>
                    )}
                  </form.Field>

                  <form.Field name={`experiences[${index}].description`}>
                    {(subField) => (
                      <div className='space-y-2'>
                        <Label htmlFor={subField.name}>Description</Label>
                        <Textarea
                          id={subField.name}
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) => subField.handleChange(e.target.value)}
                          placeholder='Describe your responsibilities and achievements...'
                          className='focus:ring-green-500 min-h-[120px] resize-none'
                        />
                        <p className="text-xs text-gray-500">
                          Tip: Use bullet points to highlight key achievements
                        </p>
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