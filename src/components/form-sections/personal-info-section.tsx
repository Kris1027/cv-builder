import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, AlertCircle } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';
import { formatPolishPhone } from '@/lib/utils';

interface PersonalInfoSectionProps {
  form: FormApi;
  validationErrors: Record<string, string>;
  setValidationErrors: (errors: Record<string, string>) => void;
}

export const PersonalInfoSection = ({ form, validationErrors, setValidationErrors }: PersonalInfoSectionProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-xl dark:text-gray-100">Personal Information</CardTitle>
        </div>
        <CardDescription className="dark:text-gray-400">Your basic contact information and professional summary</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Row 1: First Name, Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form.Field name='personalInfo.firstName'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-1">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (validationErrors['firstName']) {
                      setValidationErrors({ ...validationErrors, firstName: '' });
                    }
                  }}
                  placeholder="John"
                  className={`transition-all ${validationErrors['firstName'] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                />
                {validationErrors['firstName'] && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors['firstName']}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.lastName'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-1">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (validationErrors['lastName']) {
                      setValidationErrors({ ...validationErrors, lastName: '' });
                    }
                  }}
                  placeholder="Doe"
                  className={`transition-all ${validationErrors['lastName'] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                />
                {validationErrors['lastName'] && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors['lastName']}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Row 2: Location, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form.Field name='personalInfo.location'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Location</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="New York, NY"
                  className="focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.email'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-1">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='email'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (validationErrors['email']) {
                      setValidationErrors({ ...validationErrors, email: '' });
                    }
                  }}
                  placeholder="john.doe@example.com"
                  className={`transition-all ${validationErrors['email'] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                />
                {validationErrors['email'] && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors['email']}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.phone'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Phone</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='tel'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(formatPolishPhone(e.target.value))}
                  placeholder="+48 123 456 789"
                  className="focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Row 3: Professional Title (full width) */}
        <div className="grid grid-cols-1 gap-6">
          <form.Field name='personalInfo.title'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Professional Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Software Engineer"
                  className="focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Row 4: Website, LinkedIn, GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form.Field name='personalInfo.website'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Website</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://johndoe.com"
                  className="focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.linkedin'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>LinkedIn</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name='personalInfo.github'>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>GitHub</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type='url'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://github.com/johndoe"
                  className="focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>
        </div>
      </CardContent>
    </Card>
  );
};