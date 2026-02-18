import { describe, expect, it } from 'vitest';

import { generateCVFilename } from './pdf-export';

describe('generateCVFilename', () => {
    it('builds filename from first and last name', () => {
        expect(generateCVFilename('John', 'Doe')).toBe('John-Doe-CV.pdf');
    });

    it('uses only first name when last name is missing', () => {
        expect(generateCVFilename('John')).toBe('John-CV.pdf');
    });

    it('uses only last name when first name is missing', () => {
        expect(generateCVFilename(undefined, 'Doe')).toBe('Doe-CV.pdf');
    });

    it('falls back to "my" when no names provided', () => {
        expect(generateCVFilename()).toBe('my-CV.pdf');
    });

    it('falls back to "my" when names are empty strings', () => {
        expect(generateCVFilename('', '')).toBe('my-CV.pdf');
    });
});
