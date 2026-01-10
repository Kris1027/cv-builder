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
