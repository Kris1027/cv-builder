import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
                  <label className="text-sm font-medium" htmlFor={f.name}>
                    First Name *
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="text-sm font-medium" htmlFor={f.name}>
                    Last Name *
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="text-sm font-medium" htmlFor={f.name}>
                    Email *
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type="email"
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="text-sm font-medium" htmlFor={f.name}>
                    Phone
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type="tel"
                    value={f.state.value}
                    onBlur={f.handleBlur}
                    onChange={(e) => f.handleChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="text-sm font-medium" htmlFor={f.name}>
                  Location
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  value={f.state.value}
                  onBlur={f.handleBlur}
                  onChange={(e) => f.handleChange(e.target.value)}
                  placeholder="City, Country"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="text-sm font-medium" htmlFor={f.name}>
                  Professional Title *
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  value={f.state.value}
                  onBlur={f.handleBlur}
                  onChange={(e) => f.handleChange(e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <form.Field name="personalInfo.summary">
          {(field) => {
            const f = field as FieldApi<string>;
            return (
              <div>
                <label className="text-sm font-medium" htmlFor={f.name}>
                  Professional Summary
                </label>
                <textarea
                  id={f.name}
                  name={f.name}
                  value={f.state.value}
                  onBlur={f.handleBlur}
                  onChange={(e) => f.handleChange(e.target.value)}
                  rows={4}
                  placeholder="Brief overview of your professional background and goals..."
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            );
          }}
        </form.Field>
      </CardContent>
    </Card>
  );
};