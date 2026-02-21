export const TEMPLATE_IDS = ['developer', 'default', 'veterinary'] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];
