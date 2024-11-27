import type React from 'react';

export const getThemeFromClosestAncestor = (
  ref: React.RefObject<HTMLElement>,
) => {
  if (!ref.current) return;
  const matches = ref.current.closest('[data-theme]');
  if (matches) return matches.getAttribute('data-theme');
};

export const sentenceCase = (sentence: string) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();