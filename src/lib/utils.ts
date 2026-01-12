import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a website URL to display just the domain
 * e.g., "https://techkris.eu/" → "techkris.eu"
 */
export function formatWebsiteDisplay(url: string): string {
  if (!url) return '';
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

/**
 * Format a GitHub URL to display just the username
 * e.g., "https://github.com/Kris1027" → "Kris1027"
 */
export function formatGithubDisplay(url: string): string {
  if (!url) return '';
  const match = url.match(/github\.com\/([^/]+)/);
  return match ? match[1] : url;
}

/**
 * Format a LinkedIn URL to display just the profile name
 * e.g., "https://www.linkedin.com/in/krzysztof-obarzanek/" → "krzysztof-obarzanek"
 */
export function formatLinkedinDisplay(url: string): string {
  if (!url) return '';
  const match = url.match(/linkedin\.com\/in\/([^/]+)/);
  return match ? match[1] : url;
}

/**
 * Format a Polish mobile phone number
 * Input: any string with digits (e.g., "123456789", "+48123456789", "48 123 456 789")
 * Output: formatted as "+48 XXX XXX XXX"
 */
export function formatPolishPhone(value: string): string {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, '');

  // Remove leading 48 if present (country code without +)
  if (digits.startsWith('48') && digits.length > 9) {
    digits = digits.slice(2);
  }

  // Limit to 9 digits (Polish mobile number length)
  digits = digits.slice(0, 9);

  // Format as XXX XXX XXX
  let formatted = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formatted += ' ';
    }
    formatted += digits[i];
  }

  // Add +48 prefix if we have any digits
  if (formatted) {
    return '+48 ' + formatted;
  }

  return '';
}
