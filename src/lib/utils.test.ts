import { describe, expect, it } from 'vitest';

import {
    cn,
    formatGithubDisplay,
    formatLinkedinDisplay,
    formatPolishPhone,
    formatWebsiteDisplay,
} from './utils';

describe('cn', () => {
    it('merges class names', () => {
        expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
        const isHidden = false;
        expect(cn('base', isHidden && 'hidden', 'visible')).toBe('base visible');
    });

    it('deduplicates tailwind classes via twMerge', () => {
        expect(cn('p-4', 'p-8')).toBe('p-8');
    });

    it('returns empty string for no inputs', () => {
        expect(cn()).toBe('');
    });
});

describe('formatWebsiteDisplay', () => {
    it('strips https and trailing slash', () => {
        expect(formatWebsiteDisplay('https://techkris.eu/')).toBe('techkris.eu');
    });

    it('strips http', () => {
        expect(formatWebsiteDisplay('http://example.com')).toBe('example.com');
    });

    it('strips www', () => {
        expect(formatWebsiteDisplay('https://www.example.com/')).toBe('example.com');
    });

    it('returns empty string for empty input', () => {
        expect(formatWebsiteDisplay('')).toBe('');
    });
});

describe('formatGithubDisplay', () => {
    it('extracts username from GitHub URL', () => {
        expect(formatGithubDisplay('https://github.com/Kris1027')).toBe('Kris1027');
    });

    it('returns original if no match', () => {
        expect(formatGithubDisplay('not-a-github-url')).toBe('not-a-github-url');
    });

    it('returns empty string for empty input', () => {
        expect(formatGithubDisplay('')).toBe('');
    });
});

describe('formatLinkedinDisplay', () => {
    it('extracts profile name from LinkedIn URL', () => {
        expect(formatLinkedinDisplay('https://www.linkedin.com/in/krzysztof-obarzanek/')).toBe(
            'krzysztof-obarzanek',
        );
    });

    it('returns original if no match', () => {
        expect(formatLinkedinDisplay('not-a-linkedin-url')).toBe('not-a-linkedin-url');
    });

    it('returns empty string for empty input', () => {
        expect(formatLinkedinDisplay('')).toBe('');
    });
});

describe('formatPolishPhone', () => {
    it('formats 9 digits', () => {
        expect(formatPolishPhone('123456789')).toBe('+48 123 456 789');
    });

    it('strips country code prefix', () => {
        expect(formatPolishPhone('+48123456789')).toBe('+48 123 456 789');
    });

    it('strips country code without plus', () => {
        expect(formatPolishPhone('48123456789')).toBe('+48 123 456 789');
    });

    it('handles spaces in input', () => {
        expect(formatPolishPhone('48 123 456 789')).toBe('+48 123 456 789');
    });

    it('returns empty string for empty input', () => {
        expect(formatPolishPhone('')).toBe('');
    });

    it('truncates to 9 digits', () => {
        expect(formatPolishPhone('1234567890')).toBe('+48 123 456 789');
    });
});
