import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/ui/field-error';
import { User } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';
import { formatPolishPhone } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type PersonalInfoSectionProps = {
    form: FormApi;
};

export const PersonalInfoSection = ({ form }: PersonalInfoSectionProps) => {
    const { t } = useTranslation();

    return (
        <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="text-xl dark:text-gray-100">
                        {t('sections.personalInfo.title')}
                    </CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                    {t('sections.personalInfo.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Row 1: First Name, Last Name */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <form.Field name="personalInfo.firstName">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="flex items-center gap-1">
                                    {t('form.firstName')} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.firstName')}
                                    className={`transition-all ${field.state.meta.isTouched && !field.state.meta.isValid ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                <FieldError
                                    errors={field.state.meta.errors}
                                    isTouched={field.state.meta.isTouched}
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="personalInfo.lastName">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="flex items-center gap-1">
                                    {t('form.lastName')} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.lastName')}
                                    className={`transition-all ${field.state.meta.isTouched && !field.state.meta.isValid ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                <FieldError
                                    errors={field.state.meta.errors}
                                    isTouched={field.state.meta.isTouched}
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Row 2: Professional Title (full width) */}
                <div className="grid grid-cols-1 gap-6">
                    <form.Field name="personalInfo.title">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>{t('form.professionalTitle')}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.professionalTitle')}
                                    className="focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Row 3: Location, Email, Phone */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <form.Field name="personalInfo.location">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>{t('form.location')}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.location')}
                                    className="focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="personalInfo.email">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="flex items-center gap-1">
                                    {t('form.email')} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="email"
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.email')}
                                    className={`transition-all ${field.state.meta.isTouched && !field.state.meta.isValid ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                <FieldError
                                    errors={field.state.meta.errors}
                                    isTouched={field.state.meta.isTouched}
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="personalInfo.phone">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>{t('form.phone')}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="tel"
                                    value={field.state.value as string}
                                    onBlur={(e) => {
                                        field.handleBlur();
                                        // Format on blur only if there are digits
                                        const digits = e.target.value.replace(/\D/g, '');
                                        if (digits.length > 0) {
                                            field.handleChange(formatPolishPhone(e.target.value));
                                        }
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.phone')}
                                    className="focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Row 4: Website, LinkedIn, GitHub */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <form.Field name="personalInfo.website">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>{t('form.website')}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="url"
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.website')}
                                    className="focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="personalInfo.linkedin">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>{t('form.linkedin')}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="url"
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.linkedin')}
                                    className="focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="personalInfo.github">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>{t('form.github')}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="url"
                                    value={field.state.value as string}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder={t('placeholders.github')}
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
