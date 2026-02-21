import { format } from 'date-fns';
import type { Locale } from 'date-fns';
import { enUS, pl } from 'date-fns/locale';
import i18n from '@/i18n/config';

const localeMap: Record<string, Locale> = {
    en: enUS,
    pl: pl,
};

const getLocale = (): Locale => {
    const lang = (i18n.resolvedLanguage ?? i18n.language)?.split('-')[0];
    return (lang ? localeMap[lang] : undefined) ?? enUS;
};

export const formatCVDate = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, 'LLLL yyyy', { locale: getLocale() });
};

export const formatCVDateShort = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, 'LLL yyyy', { locale: getLocale() });
};

export const formatCVYear = (dateString: string): string => {
    if (!dateString) return '';
    const [year] = dateString.split('-');
    return year;
};

export const getMonthNames = (short = false): string[] => {
    const locale = getLocale();
    const formatStr = short ? 'LLL' : 'LLLL';
    return Array.from({ length: 12 }, (_, i) => format(new Date(2024, i), formatStr, { locale }));
};
