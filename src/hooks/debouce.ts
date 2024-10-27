import React from "react";
import { useEffect, useState } from "react";

export const useDebouce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerOut);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const functionDebounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: number
  return React.useCallback((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), delay)
  }, [])
}
