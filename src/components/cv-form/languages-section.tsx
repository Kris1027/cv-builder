import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { LanguagesSectionProps, FieldApi, Language } from '@/types/form-types';

export const LanguagesSection = ({ form, addLanguage, removeLanguage }: LanguagesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
        <CardDescription>
          Add languages you speak
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {form.state.values.languages.map((_: Language, index: number) => (
          <div key={index} className="flex gap-4 items-end">
            <form.Field name={`languages[${index}].language`}>
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div className="flex-1">
                    <label className="text-sm font-medium" htmlFor={f.name}>
                      Language
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

            <form.Field name={`languages[${index}].proficiency`}>
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div className="flex-1">
                    <label className="text-sm font-medium" htmlFor={f.name}>
                      Proficiency
                    </label>
                    <select
                      id={f.name}
                      name={f.name}
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>
                );
              }}
            </form.Field>

            {form.state.values.languages.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeLanguage(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addLanguage}
          className="w-full"
        >
          Add Language
        </Button>
      </CardContent>
    </Card>
  );
};