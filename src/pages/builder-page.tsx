import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';

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
