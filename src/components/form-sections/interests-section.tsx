import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { InterestProps } from '@/types/form-types';
import { Plus, Heart, X } from 'lucide-react';
import { useState } from 'react';
import type { FormApi } from '@/types/form-component-types';

interface InterestsSectionProps {
  form: FormApi;
  addInterest: () => void;
  removeInterest: (index: number) => void;
}

export const InterestsSection = ({ form, removeInterest }: InterestsSectionProps) => {
  const [interestInput, setInterestInput] = useState('');

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      form.setFieldValue('interests', [...form.getFieldValue('interests'), { name: interestInput.trim() }]);
      setInterestInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInterest();
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <CardTitle className="text-xl">Interests & Hobbies</CardTitle>
            </div>
            <CardDescription className="mt-1">Add your personal interests and hobbies</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type an interest and press Enter or click Add"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="focus:ring-rose-500"
            />
            <Button
              type="button"
              onClick={handleAddInterest}
              disabled={!interestInput.trim()}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <form.Field name='interests'>
            {(field) => (
              <div>
                {field.state.value.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No interests added yet</p>
                    <p className="text-sm mt-1">Share what you're passionate about</p>
                  </div>
                ) : (
                  <div className='flex flex-wrap gap-2'>
                    {field.state.value.map((interest: InterestProps, index: number) => (
                      <div
                        key={index}
                        className='group flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 rounded-full hover:shadow-md transition-all'
                      >
                        <span className='text-sm font-medium text-gray-700'>{interest.name}</span>
                        <button
                          type='button'
                          onClick={() => removeInterest(index)}
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

          {form.getFieldValue('interests').length > 0 && (
            <p className="text-xs text-gray-500 mt-4">
              Tip: Interests can help show your personality and make connections with interviewers.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};