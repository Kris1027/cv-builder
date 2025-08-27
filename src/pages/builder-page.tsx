import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { LanguageLevelProps } from '@/types/form-types';
import { useForm } from '@tanstack/react-form';

const languageLevels: { value: LanguageLevelProps; label: string }[] = [
  { value: 'A1', label: 'A1 - Beginner' },
  { value: 'A2', label: 'A2 - Elementary' },
  { value: 'B1', label: 'B1 - Intermediate' },
  { value: 'B2', label: 'B2 - Upper Intermediate' },
  { value: 'C1', label: 'C1 - Advanced' },
  { value: 'C2', label: 'C2 - Proficient' },
  { value: 'NATIVE', label: 'Native' },
];

const BuilderPage = () => {
  const form = useForm({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        location: '',
        title: '',
        phone: '',
        email: '',
        website: '',
        linkedin: '',
        github: '',
      },
      experience: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
      education: {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      },
      skills: {
        name: '',
      },
      languages: {
        language: '',
        proficiency: '',
      },
      interests: {
        name: '',
      },
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* personal-info-section */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic contact information and professional summary</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='personalInfo.firstName'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>First Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.lastName'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Last Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.location'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>location</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.title'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Professional Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.phone'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Phone</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='tel'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.email'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='email'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.website'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Website</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.linkedin'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>LinkedIn</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.github'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>GitHub</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* experience-section */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Add your professional experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='experience.company'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Company</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='experience.position'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Position</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='experience.startDate'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Start Date</Label>
                <DatePicker
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(date) => field.handleChange(date ? date.toISOString() : '')}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='experience.endDate'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>End Date</Label>
                <DatePicker
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(date) => field.handleChange(date ? date.toISOString() : '')}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='experience.current'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Current</Label>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(!!checked)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='experience.description'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* education-section */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='education.institution'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Institution</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='education.degree'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Degree</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='education.field'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Field of Study</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='education.startDate'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Start Date</Label>
                <DatePicker
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(date) => field.handleChange(date ? date.toISOString() : '')}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='education.endDate'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>End Date</Label>
                <DatePicker
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(date) => field.handleChange(date ? date.toISOString() : '')}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='education.description'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* skills-section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Add your professional skills</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='skills.name'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Skill</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* languages-section */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Add languages you speak</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='languages.language'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Language</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name='languages.proficiency'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Proficiency</Label>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select proficiency' />
                  </SelectTrigger>
                  <SelectContent>
                    {languageLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* interests-section */}
      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
          <CardDescription>Add your personal interests and hobbies</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name='interests.name'>
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Interest</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type='submit' disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
};

export default BuilderPage;
