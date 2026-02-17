import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';
import type { FormApi } from '@/types/form-component-types';
import { useTranslation } from 'react-i18next';

interface GdprConsentSectionProps {
    form: FormApi;
}

export const GdprConsentSection = ({ form }: GdprConsentSectionProps) => {
    const { t } = useTranslation();

    return (
        <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <CardTitle className="text-xl dark:text-gray-100">
                        {t('sections.gdprConsent.title')}
                    </CardTitle>
                </div>
                <CardDescription className="mt-1 dark:text-gray-400">
                    {t('sections.gdprConsent.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <form.Field name="gdprConsent.enabled">
                        {(field) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="gdpr-enabled"
                                    checked={field.state.value as boolean}
                                    onCheckedChange={(checked) => field.handleChange(!!checked)}
                                    className="border-green-400"
                                />
                                <Label
                                    htmlFor="gdpr-enabled"
                                    className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {t('sections.gdprConsent.enable')}
                                </Label>
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="gdprConsent.enabled">
                        {(enabledField) =>
                            (enabledField.state.value as boolean) ? (
                                <form.Field name="gdprConsent.companyName">
                                    {(field) => (
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="gdpr-company"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                {t('sections.gdprConsent.companyName')}
                                            </Label>
                                            <Input
                                                id="gdpr-company"
                                                placeholder={t(
                                                    'sections.gdprConsent.companyNamePlaceholder',
                                                )}
                                                value={field.state.value as string}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className="focus:ring-green-500"
                                            />
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {t('sections.gdprConsent.companyNameHint')}
                                            </p>
                                        </div>
                                    )}
                                </form.Field>
                            ) : null
                        }
                    </form.Field>
                </div>
            </CardContent>
        </Card>
    );
};
