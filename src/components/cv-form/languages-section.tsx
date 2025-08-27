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
import type { Language } from '@/types/form-types';
import { useState } from 'react';

export const LanguagesSection = () => {
  const [languages, setLanguages] = useState<Language[]>([
    {
      language: '',
      proficiency: 'Beginner',
    },
  ]);

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: '',
        proficiency: 'Beginner',
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    setLanguages(updatedLanguages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
        <CardDescription>Add languages you speak</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {languages.map((lang, index) => (
          <div key={index} className='flex gap-4 items-end'>
            <div className='flex-1'>
              <Label htmlFor={`language-${index}-language`}>Language</Label>
              <Input
                id={`language-${index}-language`}
                value={lang.language || ''}
                onChange={(e) => updateLanguage(index, 'language', e.target.value)}
              />
            </div>

            <div className='flex-1'>
              <Label htmlFor={`language-${index}-proficiency`}>Proficiency</Label>
              <Select
                value={lang.proficiency || 'Beginner'}
                onValueChange={(value) => updateLanguage(index, 'proficiency', value)}
              >
                <SelectTrigger id={`language-${index}-proficiency`}>
                  <SelectValue placeholder='Select proficiency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Beginner'>Beginner</SelectItem>
                  <SelectItem value='Intermediate'>Intermediate</SelectItem>
                  <SelectItem value='Advanced'>Advanced</SelectItem>
                  <SelectItem value='Native'>Native</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {languages.length > 1 && (
              <Button
                type='button'
                variant='destructive'
                size='sm'
                onClick={() => removeLanguage(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button type='button' variant='outline' onClick={addLanguage} className='w-full'>
          Add Language
        </Button>
      </CardContent>
    </Card>
  );
};
