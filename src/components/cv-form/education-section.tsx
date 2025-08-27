import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
                      <label className="text-sm font-medium" htmlFor={f.name}>
                        Institution
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="text-sm font-medium" htmlFor={f.name}>
                        Degree
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                        placeholder="e.g., Bachelor's, Master's"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="text-sm font-medium" htmlFor={f.name}>
                      Field of Study
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                      placeholder="e.g., Computer Science"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="text-sm font-medium" htmlFor={f.name}>
                        Start Date
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        type="month"
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="text-sm font-medium" htmlFor={f.name}>
                        End Date
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        type="month"
                        value={f.state.value}
                        onBlur={f.handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => f.handleChange(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="text-sm font-medium" htmlFor={f.name}>
                      Description
                    </label>
                    <textarea
                      id={f.name}
                      name={f.name}
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e) => f.handleChange(e.target.value)}
                      rows={2}
                      placeholder="Notable achievements, GPA, relevant coursework..."
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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