import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce function to limit how often a function can be called
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}

// Throttle function to limit the rate at which a function is executed
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
