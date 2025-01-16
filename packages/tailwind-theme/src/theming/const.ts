import { themes } from '../themes';

const DEFAULT_THEMES = Object.keys(themes);

const DEFAULT_UTILITY_VALUES = {
  '--radius': '0.5rem',
  '--font-sans': 'Inter',
  '--font-serif': 'Lexend',
  '--font-mono': 'Source Code Pro',
  '--border-angle': '0deg',
};

const generateColorVariants = (colorName: string) => ({
  DEFAULT: `oklch(var(--${colorName})/<alpha-value>)`,
  content: `oklch(var(--${colorName}-content)/<alpha-value>)`,
  foreground: `oklch(var(--on-${colorName})/<alpha-value>)`,
  container: `oklch(var(--${colorName}-container)/<alpha-value>)`,
  'container-foreground': `oklch(var(--on-${colorName}-container)/<alpha-value>)`,
  light: `oklch(var(--${colorName}-light)/<alpha-value>)`,
  base: `oklch(var(--${colorName}-base)/<alpha-value>)`,
  dark: `oklch(var(--${colorName}-dark)/<alpha-value>)`,
  ...Array.from({ length: 19 }, (_, i) => i * 50).reduce<Record<number, string>>((acc, shade) => {
    if (shade === 0) return acc;
    acc[shade] = `oklch(var(--${colorName}-${shade})/<alpha-value>)`;
    return acc;
  }, {}),
});

const SHADCN_COLOR_UTILITIES = {
  background: 'oklch(var(--primary-50)/<alpha-value>)',
  foreground: 'oklch(var(--neutral-700)/<alpha-value>)',
  card: {
    DEFAULT: 'oklch(var(--primary-50))',
    foreground: 'oklch(var(--neutral-700))',
  },
  popover: {
    DEFAULT: 'oklch(var(--primary-50))',
    foreground: 'oklch(var(--neutral-700))',
  },
  muted: {
    DEFAULT: 'oklch(var(--neutral-200)/<alpha-value>)',
    foreground: 'oklch(var(--neutral-500)/<alpha-value>)',
  },
  destructive: {
    DEFAULT: 'oklch(var(--error)/<alpha-value>)',
    foreground: 'oklch(var(--on-error)/<alpha-value>)',
  },
  border: 'oklch(var(--neutral-200)/<alpha-value>)',
  input: 'oklch(var(--neutral-200)/<alpha-value>)',
  ring: 'oklch(var(--neutral-100)/<alpha-value>)',
  chart: Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => [
      String(i + 1),
      `oklch(var(--primary-rainbow-${i + 1}))`,
    ])
  ),
  sidebar: {
    DEFAULT: 'oklch(var(--primary-100))',
    foreground: 'oklch(var(--neutral-700))',
    primary: 'oklch(var(--primary))',
    'primary-foreground': 'oklch(var(--on-primary))',
    accent: 'oklch(var(--accent))',
    'accent-foreground': 'oklch(var(--on-accent))',
    border: 'oklch(var(--neutral-200))',
    ring: 'oklch(var(--neutral-100))',
  },
};

const colorNames = [
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
];

const PALETTE_COLORS = {
  ...colorNames.reduce(
    (acc, color) => {
      acc[color] = generateColorVariants(color);
      return acc;
    },
    {} as Record<string, ReturnType<typeof generateColorVariants>>
  ),
  'base-100': 'oklch(var(--base-100)/<alpha-value>)',
  'base-200': 'oklch(var(--base-200)/<alpha-value>)',
  'base-300': 'oklch(var(--base-300)/<alpha-value>)',
  'base-foreground': 'oklch(var(--on-surface)/<alpha-value>)',
  ring: 'oklch(var(--r)/<alpha-value>)',
};

export {
  DEFAULT_THEMES,
  DEFAULT_UTILITY_VALUES,
  SHADCN_COLOR_UTILITIES,
  PALETTE_COLORS,
};
