import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get the base URL from Vite's configuration
const base = import.meta.env.BASE_URL || '/';

// Resolve a path relative to the base URL
export function resolveDataPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with slash
  const baseWithSlash = base.endsWith('/') ? base : base + '/';
  return baseWithSlash + cleanPath;
}
