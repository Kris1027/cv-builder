import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import type { ExperienceSectionProps } from '@/types/form-types';

export const ExperienceSection = ({ 
  experience, 
  addExperience, 
  removeExperience, 
  updateExperience 
}: ExperienceSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>
          Add your professional experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Experience {index + 1}</h4>
              {experience.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`experience-${index}-company`}>
                  Company
                </Label>
                <Input
                  id={`experience-${index}-company`}
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`experience-${index}-position`}>
                  Position
                </Label>
                <Input
                  id={`experience-${index}-position`}
                  value={exp.position || ''}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`experience-${index}-startDate`}>
                  Start Date
                </Label>
                <DatePicker
                  id={`experience-${index}-startDate`}
                  value={exp.startDate || ''}
                  onChange={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      updateExperience(index, 'startDate', `${year}-${month}`);
                    } else {
                      updateExperience(index, 'startDate', '');
                    }
                  }}
                  placeholder="Select start date"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id={`experience-${index}-current`}
                    type="checkbox"
                    checked={exp.current || false}
                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    className="mr-2"
                  />
                  <Label htmlFor={`experience-${index}-current`}>
                    Current position
                  </Label>
                </div>

                {!exp.current && (
                  <div>
                    <Label htmlFor={`experience-${index}-endDate`}>
                      End Date
                    </Label>
                    <DatePicker
                      id={`experience-${index}-endDate`}
                      value={exp.endDate || ''}
                      onChange={(date) => {
                        if (date) {
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          updateExperience(index, 'endDate', `${year}-${month}`);
                        } else {
                          updateExperience(index, 'endDate', '');
                        }
                      }}
                      placeholder="Select end date"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor={`experience-${index}-description`}>
                Description
              </Label>
              <Textarea
                id={`experience-${index}-description`}
                value={exp.description || ''}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                rows={3}
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full"
        >
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};