export const SITE_URL = import.meta.env.VITE_SITE_URL;

export const SEO_DEFAULTS = {
    siteName: 'CV Builder',
    description:
        'Create professional resumes with our free CV builder. Choose from multiple templates, customize your layout, and export to PDF in minutes.',
    keywords:
        'cv builder, resume builder, free cv maker, professional resume, pdf resume, cv templates, resume templates',
} as const;

export const OG_DEFAULTS = {
    image: `${SITE_URL}/og-image.png`,
    imageWidth: '1200',
    imageHeight: '630',
    type: 'website',
    locale: 'en_US',
} as const;

export const TEMPLATE_NAMES: Record<string, string> = {
    developer: 'Developer',
    default: 'Default',
    veterinary: 'Veterinary',
} as const;
