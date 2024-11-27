import { useContext, useEffect } from 'react';
import type { DataTheme } from '../../types';
import { ThemeContext } from './ThemeContext';

export const useTheme = (value?: DataTheme) => {
  const { theme, setTheme } = useContext(ThemeContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (value && theme !== value) {
      setTheme(value);
    }
  }, [value]);

  return { theme, setTheme };
};
