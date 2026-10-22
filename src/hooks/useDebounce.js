import { useState, useEffect } from 'react';

/**
 * useDebounce Custom Hook
 * Delays updating the debounced value until after the specified delay has elapsed
 * since the last time the input value changed.
 * Ideal for search inputs, typeaheads, and API rate limiting.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
