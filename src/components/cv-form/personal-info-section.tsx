import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FormSectionProps, FieldApi } from '@/types/form-types';

export const PersonalInfoSection = ({ form }: FormSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Your basic contact information and professional summary
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="personalInfo.firstName"
            validators={{
              onChange: ({ value }: { value: string }) =>
                !value ? 'First name is required' : undefined,
            }}
          >
            {(field) => {
              const f = field as FieldApi<string>;
              return (
                <div>
                  <Label htmlFor={f.name}>
                    First Name *
                  </Label>
                  <Input
                    id={f.name}
                    name={f.name}
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                  {f.state.meta.errors ? (
                    <p className="text-red-500 text-sm mt-1">
                      {f.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="personalInfo.lastName"
            validators={{
              onChange: ({ value }: { value: string }) =>
                !value ? 'Last name is required' : undefined,
            }}
          >
            {(field) => {
              const f = field as FieldApi<string>;
              return (
                <div>
                  <Label htmlFor={f.name}>
                    Last Name *
                  </Label>
                  <Input
                    id={f.name}
                    name={f.name}
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                  {f.state.meta.errors ? (
                    <p className="text-red-500 text-sm mt-1">
                      {f.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="personalInfo.email"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (!value) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                  return 'Invalid email address';
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              const f = field as FieldApi<string>;
              return (
                <div>
                  <Label htmlFor={f.name}>
                    Email *
                  </Label>
                  <Input
                    id={f.name}
                    name={f.name}
                    type="email"
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                  {f.state.meta.errors ? (
                    <p className="text-red-500 text-sm mt-1">
                      {f.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="personalInfo.phone">
            {(field) => {
              const f = field as FieldApi<string>;
              return (
                <div>
                  <Label htmlFor={f.name}>
                    Phone
                  </Label>
                  <Input
                    id={f.name}
                    name={f.name}
                    type="tel"
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                </div>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="personalInfo.location">
          {(field) => {
            const f = field as FieldApi<string>;
            return (
              <div>
                <Label htmlFor={f.name}>
                  Location
                </Label>
                <Input
                  id={f.name}
                  name={f.name}
                  value={f.state.value}
                  onBlur={f.handleBlur}
                  onChange={(e) => f.handleChange(e.target.value)}
                  placeholder="City, Country"
                />
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="personalInfo.title"
          validators={{
            onChange: ({ value }: { value: string }) =>
              !value ? 'Professional title is required' : undefined,
          }}
        >
          {(field) => {
            const f = field as FieldApi<string>;
            return (
              <div>
                <Label htmlFor={f.name}>
                  Professional Title *
                </Label>
                <Input
                  id={f.name}
                  name={f.name}
                  value={f.state.value}
                  onBlur={f.handleBlur}
                  onChange={(e) => f.handleChange(e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                />
                {f.state.meta.errors ? (
                  <p className="text-red-500 text-sm mt-1">
                    {f.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            );
          }}
        </form.Field>

        {/* Online Profiles Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Online Profiles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form.Field name="personalInfo.website">
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div>
                    <Label htmlFor={f.name}>
                      Website
                    </Label>
                    <Input
                      id={f.name}
                      name={f.name}
                      type="url"
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e) => f.handleChange(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                );
              }}
            </form.Field>

            <form.Field name="personalInfo.linkedin">
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div>
                    <Label htmlFor={f.name}>
                      LinkedIn
                    </Label>
                    <Input
                      id={f.name}
                      name={f.name}
                      type="url"
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e) => f.handleChange(e.target.value)}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                );
              }}
            </form.Field>

            <form.Field name="personalInfo.github">
              {(field) => {
                const f = field as FieldApi<string>;
                return (
                  <div>
                    <Label htmlFor={f.name}>
                      GitHub
                    </Label>
                    <Input
                      id={f.name}
                      name={f.name}
                      type="url"
                      value={f.state.value}
                      onBlur={f.handleBlur}
                      onChange={(e) => f.handleChange(e.target.value)}
                      placeholder="github.com/username"
                    />
                  </div>
                );
              }}
            </form.Field>
          </div>
        </div>

        <form.Field name="personalInfo.summary">
          {(field) => {
            const f = field as FieldApi<string>;
            return (
              <div>
                <Label htmlFor={f.name}>
                  Professional Summary
                </Label>
                <Textarea
                  id={f.name}
                  name={f.name}
                  value={f.state.value}
                  onBlur={f.handleBlur}
                  onChange={(e) => f.handleChange(e.target.value)}
                  rows={4}
                  placeholder="Brief overview of your professional background and goals..."
                />
              </div>
            );
          }}
        </form.Field>
      </CardContent>
    </Card>
  );
};