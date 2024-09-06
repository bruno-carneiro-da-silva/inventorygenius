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
