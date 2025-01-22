export const getPaletteColor = (
  token: string,
  palette?: Record<string, { name: string; color: string }>,
  key: 'color' | 'name' = 'color',
) => {
  if (!palette) {
    return 'transparent';
  }

  // check if token key exists in palette else log the token
  if (!palette?.[token]) {
    console.warn(`Warning: ${token} not found in palette`);
    return 'transparent';
  }

  return palette[token]?.[key];
};
