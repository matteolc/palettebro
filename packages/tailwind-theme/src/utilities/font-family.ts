import defaultTheme from 'tailwindcss/defaultTheme';

export const fontFamily = {
  sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
  display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
  mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
  serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
};
