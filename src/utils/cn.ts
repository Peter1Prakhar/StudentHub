import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function for combining Tailwind classes conditionally
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}