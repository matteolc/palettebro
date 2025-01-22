import { MATERIAL_TONES } from '@palettebruh/theme-generator';

const DEFAULT_UTILITY_VALUES = {
  '--radius': '0.5rem',
  '--font-sans': 'Inter',
  '--font-serif': 'Lexend',
  '--font-mono': 'Source Code Pro',
  '--border-angle': '0deg',
};

const generateMuiColorShades = (colorName: string) => ({
  ...MATERIAL_TONES.reduce<Record<number, string>>((acc, tone) => {
    acc[tone] = `oklch(var(--${colorName}-${tone})/<alpha-value>)`;
    return acc;
  }, {}),
});

const generateMUIColorVariants = (colorName: string) => ({
  [`on-${colorName}`]: `oklch(var(--on-${colorName})/<alpha-value>)`,
  [`${colorName}-container`]: `oklch(var(--${colorName}-container)/<alpha-value>)`,
  [`on-${colorName}-container`]: `oklch(var(--on-${colorName}-container)/<alpha-value>)`,
});

const generateTailwindColorShades = (colorName: string) => ({
  ...Array.from({ length: 19 }, (_, i) => i * 50).reduce<
    Record<number, string>
  >((acc, shade) => {
    if (shade === 0) return acc;
    acc[shade] = `oklch(var(--${colorName}-${shade})/<alpha-value>)`;
    return acc;
  }, {}),
});

const generateShadcnColorVariants = (colorName: string) => ({
  DEFAULT: `oklch(var(--${colorName})/<alpha-value>)`,
  foreground: `oklch(var(--on-${colorName})/<alpha-value>)`,
});

const SHADCN_COLOR_UTILITIES = {
  background: 'oklch(var(--background)/<alpha-value>)',
  foreground: 'oklch(var(--on-background)/<alpha-value>)',
  card: {
    DEFAULT: 'oklch(var(--surface-container-low))',
    foreground: 'oklch(var(--on-surface))',
  },
  popover: {
    DEFAULT: 'oklch(var(--primary-50))',
    foreground: 'oklch(var(--neutral-700))',
  },
  muted: {
    DEFAULT: 'oklch(var(--secondary)/<alpha-value>)',
    foreground: 'oklch(var(--on-secondary)/<alpha-value>)',
  },
  destructive: {
    DEFAULT: 'oklch(var(--error)/<alpha-value>)',
    foreground: 'oklch(var(--on-error)/<alpha-value>)',
  },
  border: 'oklch(var(--surface-container-high)/<alpha-value>)',
  input: 'oklch(var(--outline)/<alpha-value>)',
  ring: 'oklch(var(--outline-variant)/<alpha-value>)',
  chart: Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => [
      String(i + 1),
      `oklch(var(--primary-rainbow-${i + 1}))`,
    ]),
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
  ...generateMUIColorVariants('primary'),
  ...generateMUIColorVariants('secondary'),
  ...generateMUIColorVariants('accent'),
  ...generateMUIColorVariants('neutral'),
  // ...generateMUIColorVariants('info'),
  // ...generateMUIColorVariants('success'),
  // ...generateMUIColorVariants('warning'),
  ...generateMUIColorVariants('error'),
  ...colorNames.reduce<
    Record<
      string,
      {
        DEFAULT: string;
        foreground: string;
        container?: string;
        [key: string | number]: string | undefined;
      }
    >
  >((acc, color) => {
    acc[color] = {
      ...generateShadcnColorVariants(color),
      ...generateMuiColorShades(color),
    };
    return acc;
  }, {}),
  'base-100': 'oklch(var(--surface-container-highest)/<alpha-value>)',
  'base-200': 'oklch(var(--surface-container)/<alpha-value>)',
  'base-300': 'oklch(var(--surface-container-lowest)/<alpha-value>)',
  'base-foreground': 'oklch(var(--on-surface)/<alpha-value>)',
};

export { DEFAULT_UTILITY_VALUES, SHADCN_COLOR_UTILITIES, PALETTE_COLORS };
