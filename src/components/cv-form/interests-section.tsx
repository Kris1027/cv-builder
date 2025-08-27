import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const InterestsSection = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');

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
    <Card>
      <CardHeader>
        <CardTitle>Interests</CardTitle>
        <CardDescription>Add your personal interests and hobbies</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex gap-2'>
          <Input
            type='text'
            placeholder='Enter an interest and press Enter'
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addInterest(interestInput);
              }
            }}
            className='flex-1'
          />
          <Button type='button' variant='secondary' onClick={() => addInterest(interestInput)}>
            Add
          </Button>
        </div>

        <div className='flex flex-wrap gap-2'>
          {interests.map((interest, index) => (
            <div key={index} className='flex items-center gap-1 px-3 py-1 bg-muted rounded-full'>
              <span className='text-sm'>{interest}</span>
              <button
                type='button'
                onClick={() => removeInterest(index)}
                className='text-muted-foreground hover:text-destructive ml-1'
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
