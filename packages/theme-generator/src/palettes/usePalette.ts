/// <reference lib="dom" />
import { useCallback, useEffect } from 'react';
import type { Theme } from '../types';
import { getPalette } from './getPalette';
import { paletteToCssVars } from '../utils/palette-to-css-vars';

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
  const cssVars = paletteToCssVars(palette);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (props.theme.debug) {
      console.info(cssVars);
    }
    setCssVars(cssVars);
  }, [cssVars]);

  return palette;
};
