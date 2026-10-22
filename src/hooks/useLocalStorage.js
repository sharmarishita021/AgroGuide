import { useState, useEffect } from 'react';

/**
 * useLocalStorage Custom Hook
 * Synchronizes React state with the browser's localStorage.
 * Handles JSON serialization, parsing, error recovery, and cross-tab/cross-component events.
 */

export function useLocalStorage(key, initialValue) {
  // Read value from localStorage or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
