import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { SkillProps } from '@/types/form-types';
import { Plus, Code, X } from 'lucide-react';
import { useState } from 'react';
import type { FormApi } from '@/types/form-component-types';

interface SkillsSectionProps {
  form: FormApi;
  addSkill: () => void;
  removeSkill: (index: number) => void;
}

export const SkillsSection = ({ form, removeSkill }: SkillsSectionProps) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      form.setFieldValue('skills', [...form.getFieldValue('skills'), { name: skillInput.trim() }]);
      setSkillInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <CardTitle className="text-xl dark:text-gray-100">Skills</CardTitle>
            </div>
            <CardDescription className="mt-1 dark:text-gray-400">Add your professional skills and competencies</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a skill and press Enter or click Add"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="focus:ring-orange-500"
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              disabled={!skillInput.trim()}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <form.Field name='skills'>
            {(field) => (
              <div>
                {field.state.value.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Code className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p>No skills added yet</p>
                    <p className="text-sm mt-1">Start typing above to add skills</p>
                  </div>
                ) : (
                  <div className='flex flex-wrap gap-2'>
                    {field.state.value.map((skill: SkillProps, index: number) => (
                      <div
                        key={index}
                        className='group flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-full hover:shadow-md dark:hover:shadow-gray-900/50 transition-all'
                      >
                        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{skill.name}</span>
                        <button
                          type='button'
                          onClick={() => removeSkill(index)}
                          className='opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <X className='h-3 w-3 text-red-500 hover:text-red-700' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form.Field>

          {form.getFieldValue('skills').length > 0 && (
            <p className="text-xs text-gray-500 mt-4">
              Tip: Add skills relevant to your target position. Include both technical and soft skills.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};