import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import type { EducationSectionProps, FieldApi, Education } from '@/types/form-types';

export const EducationSection = ({ form, addEducation, removeEducation }: EducationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>
          Add your educational background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {form.state.values.education.map((_: Education, index: number) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Education {index + 1}</h4>
              {form.state.values.education.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name={`education[${index}].institution`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        Institution
                      </Label>
                      <Input
                        id={f.name}
                        name={f.name}
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                      />
                    </div>
                  );
                }}
              </form.Field>

              <form.Field name={`education[${index}].degree`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        Degree
                      </Label>
                      <Input
                        id={f.name}
                        name={f.name}
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                        placeholder="e.g., Bachelor's, Master's"
                      />
                    </div>
                  );
                }}
              </form.Field>
            </div>

            <form.Field name={`education[${index}].field`}>
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div>
                    <Label htmlFor={f.name}>
                      Field of Study
                    </Label>
                    <Input
                      id={f.name}
                      name={f.name}
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                );
              }}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name={`education[${index}].startDate`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        Start Date
                      </Label>
                      <DatePicker
                        id={f.name}
                        name={f.name}
                        value={f.state.value}
                        onChange={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            f.handleChange(`${year}-${month}`);
                          } else {
                            f.handleChange('');
                          }
                        }}
                        onBlur={f.handleBlur}
                        placeholder="Select start date"
                      />
                    </div>
                  );
                }}
              </form.Field>

              <form.Field name={`education[${index}].endDate`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        End Date
                      </Label>
                      <DatePicker
                        id={f.name}
                        name={f.name}
                        value={f.state.value}
                        onChange={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            f.handleChange(`${year}-${month}`);
                          } else {
                            f.handleChange('');
                          }
                        }}
                        onBlur={f.handleBlur}
                        placeholder="Select end date"
                      />
                    </div>
                  );
                }}
              </form.Field>
            </div>

            <form.Field name={`education[${index}].description`}>
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div>
                    <Label htmlFor={f.name}>
                      Description
                    </Label>
                    <Textarea
                      id={f.name}
                      name={f.name}
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e) => f.handleChange(e.target.value)}
                      rows={2}
                      placeholder="Notable achievements, GPA, relevant coursework..."
                    />
                  </div>
                );
              }}
            </form.Field>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full"
        >
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};