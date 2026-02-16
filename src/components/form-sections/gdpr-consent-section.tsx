import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 dark:bg-gray-800 dark:shadow-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
          <CardTitle className="text-xl dark:text-gray-100">{t('sections.gdprConsent.title')}</CardTitle>
        </div>
        <CardDescription className="mt-1 dark:text-gray-400">{t('sections.gdprConsent.description')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <form.Field name="gdprConsent.enabled">
            {(field) => (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="gdpr-enabled"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <Label htmlFor="gdpr-enabled" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                  {t('sections.gdprConsent.enable')}
                </Label>
              </div>
            )}
          </form.Field>

          <form.Field name="gdprConsent.enabled">
            {(enabledField) =>
              enabledField.state.value ? (
                <form.Field name="gdprConsent.companyName">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="gdpr-company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('sections.gdprConsent.companyName')}
                      </Label>
                      <Input
                        id="gdpr-company"
                        placeholder={t('sections.gdprConsent.companyNamePlaceholder')}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="focus:ring-green-500"
                      />
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
