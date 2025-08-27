import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ExperienceSectionProps, FieldApi, Experience } from '@/types/form-types';

export const ExperienceSection = ({ form, addExperience, removeExperience }: ExperienceSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>
          Add your professional experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {form.state.values.experience.map((_: Experience, index: number) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Experience {index + 1}</h4>
              {form.state.values.experience.length > 1 && (
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
              <form.Field name={`experience[${index}].company`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        Company
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

              <form.Field name={`experience[${index}].position`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        Position
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field name={`experience[${index}].startDate`}>
                {(field) => {
                  const f = field as FieldApi<string>;
                  return (
                    <div>
                      <Label htmlFor={f.name}>
                        Start Date
                      </Label>
                      <Input
                        id={f.name}
                        name={f.name}
                        type="month"
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                      />
                    </div>
                  );
                }}
              </form.Field>

              <div className="space-y-2">
                <form.Field name={`experience[${index}].current`}>
                  {(field) => {
                    const f = field as FieldApi<boolean>;
                    return (
                      <div className="flex items-center">
                        <input
                          id={f.name}
                          name={f.name}
                          type="checkbox"
                          checked={f.state.value}
                          onChange={(e) => f.handleChange(e.target.checked)}
                          className="mr-2"
                        />
                        <Label htmlFor={f.name}>
                          Current position
                        </Label>
                      </div>
                    );
                  }}
                </form.Field>

                {!form.state.values.experience[index].current && (
                  <form.Field name={`experience[${index}].endDate`}>
                    {(field) => {
                      const f = field as FieldApi<string>;
                      return (
                        <div>
                          <Label htmlFor={f.name}>
                            End Date
                          </Label>
                          <Input
                            id={f.name}
                            name={f.name}
                            type="month"
                            value={f.state.value}
                            onBlur={f.handleBlur}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                          />
                        </div>
                      );
                    }}
                  </form.Field>
                )}
              </div>
            </div>

            <form.Field name={`experience[${index}].description`}>
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
                      rows={3}
                      placeholder="Describe your responsibilities and achievements..."
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
          onClick={addExperience}
          className="w-full"
        >
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};