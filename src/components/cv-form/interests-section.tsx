import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InterestsSectionProps {
  interestInput: string;
  setInterestInput: (value: string) => void;
  interests: string[];
  addInterest: (interest: string) => void;
  removeInterest: (index: number) => void;
}

export const InterestsSection = ({ 
  interestInput, 
  setInterestInput, 
  interests, 
  addInterest, 
  removeInterest 
}: InterestsSectionProps) => {
  return (
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
  );
};