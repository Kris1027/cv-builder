import type { LanguageLevelProps } from '@/types/form-types';

export const languageLevels: { value: LanguageLevelProps; label: string }[] = [
  { value: 'A1', label: 'A1 - Beginner' },
  { value: 'A2', label: 'A2 - Elementary' },
  { value: 'B1', label: 'B1 - Intermediate' },
  { value: 'B2', label: 'B2 - Upper Intermediate' },
  { value: 'C1', label: 'C1 - Advanced' },
  { value: 'C2', label: 'C2 - Proficient' },
  { value: 'NATIVE', label: 'Native' },
];
