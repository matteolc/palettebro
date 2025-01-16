/// <reference lib="dom" />
import type { Theme } from '../types';
import { colorToRawOklchString } from '../utils/oklch';
import { getPalette } from './getPalette';
import { useCallback, useEffect } from 'react';

const useSetCssVars = () => {
  return useCallback((cssVars: Record<string, string>) => {
    for (const [key, value] of Object.entries(cssVars)) {
      document.documentElement.style.setProperty(key, value);
      for (const iframe of Array.from(document.querySelectorAll('iframe'))) {
        iframe.contentDocument?.documentElement.style.setProperty(key, value);
      }
    }
  }, []); // Empty deps since it doesn't depend on any external values
};

export const usePalette = (props: { theme: Theme }) => {
  const setCssVars = useSetCssVars();
  const palette = getPalette({ theme: props.theme });

  const cssVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(palette)) {
    Object.assign(cssVars, {
      [`--${key}`]: colorToRawOklchString(value.color),
    });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCssVars(cssVars);
  }, [cssVars]);

  return palette;
};
