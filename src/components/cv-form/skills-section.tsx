import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SkillsSectionProps {
  skillInput: string;
  setSkillInput: (value: string) => void;
  skills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
}

export const SkillsSection = ({ 
  skillInput, 
  setSkillInput, 
  skills, 
  addSkill, 
  removeSkill 
}: SkillsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your professional skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(skillInput);
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => addSkill(skillInput)}
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
            >
              <span className="text-sm">{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
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