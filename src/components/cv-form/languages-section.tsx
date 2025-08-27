import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LanguagesSectionProps } from '@/types/form-types';

export const LanguagesSection = ({ 
  languages, 
  addLanguage, 
  removeLanguage, 
  updateLanguage 
}: LanguagesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
        <CardDescription>
          Add languages you speak
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.map((lang, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor={`language-${index}-language`}>
                Language
              </Label>
              <Input
                id={`language-${index}-language`}
                value={lang.language || ''}
                onChange={(e) => updateLanguage(index, 'language', e.target.value)}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor={`language-${index}-proficiency`}>
                Proficiency
              </Label>
              <select
                id={`language-${index}-proficiency`}
                value={lang.proficiency || 'Beginner'}
                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </div>

            {languages.length > 1 && (
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