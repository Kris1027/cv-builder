import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languageLevels } from '@/lib/language-levels';
import type { LanguageProps, LanguageLevelProps } from '@/types/form-types';
import { Trash2, Plus, Globe } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';

interface LanguagesSectionProps {
  form: FormApi;
  addLanguage: () => void;
  removeLanguage: (index: number) => void;
}

export const LanguagesSection = ({ form, addLanguage, removeLanguage }: LanguagesSectionProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <CardTitle className="text-xl dark:text-gray-100">Languages</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">Add languages you speak</CardDescription>
          </div>
          <Button 
            type='button' 
            onClick={addLanguage}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Language
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form.Field name='languages'>
          {(field) => (
            <div className='space-y-4'>
              {field.state.value.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No languages added yet</p>
                  <p className="text-sm mt-1">Click "Add Language" to get started</p>
                </div>
              )}
              {field.state.value.map((_: LanguageProps, index: number) => (
                <div key={index} className='bg-gradient-to-r from-cyan-50/50 to-white dark:from-cyan-900/10 dark:to-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow'>
                  <div className='flex justify-between items-center mb-4'>
                    <h4 className='font-semibold text-lg text-gray-700 dark:text-gray-300'>Language {index + 1}</h4>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeLanguage(index)}
                      className='text-red-500 hover:text-red-700 hover:bg-red-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <form.Field name={`languages[${index}].language`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Language</Label>
                          <Input
                            id={subField.name}
                            name={subField.name}
                            value={subField.state.value}
                            onBlur={subField.handleBlur}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            placeholder='English, Spanish, French...'
                            className='focus:ring-cyan-500'
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name={`languages[${index}].proficiency`}>
                      {(subField) => (
                        <div className='space-y-2'>
                          <Label htmlFor={subField.name}>Proficiency Level</Label>
                          <Select
                            value={subField.state.value}
                            onValueChange={(value) =>
                              subField.handleChange(value as LanguageLevelProps)
                            }
                          >
                            <SelectTrigger className='focus:ring-cyan-500'>
                              <SelectValue placeholder='Select proficiency' />
                            </SelectTrigger>
                            <SelectContent>
                              {languageLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-medium'>{level.value}</span>
                                    <span className='text-sm text-gray-500'>- {level.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form.Field>
      </CardContent>
    </Card>
  );
};