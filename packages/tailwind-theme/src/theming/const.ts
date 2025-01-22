import { MATERIAL_TONES } from '@palettebro/theme-generator';

const DEFAULT_UTILITY_VALUES = {
  '--radius': '0.5rem',
  '--font-sans': 'Inter',
  '--font-serif': 'Lexend',
  '--font-mono': 'Source Code Pro',
  '--border-angle': '0deg',
};

const MUI_SURFACE_TOKENS = {
  surface: 'oklch(var(--surface)/<alpha-value>)',
  'surface-dim': 'oklch(var(--surface-dim)/<alpha-value>)',
  'surface-bright': 'oklch(var(--surface-bright)/<alpha-value>)',
  'surface-container-highest':
    'oklch(var(--surface-container-highest)/<alpha-value>)',
  'surface-container-high':
    'oklch(var(--surface-container-high)/<alpha-value>)',
  'surface-container': 'oklch(var(--surface-container)/<alpha-value>)',
  'surface-container-low': 'oklch(var(--surface-container-low)/<alpha-value>)',
  'surface-container-lowest':
    'oklch(var(--surface-container-lowest)/<alpha-value>)',
  'on-surface': 'oklch(var(--on-surface)/<alpha-value>)',
  'surface-variant': 'oklch(var(--surface-variant)/<alpha-value>)',
  'on-surface-variant': 'oklch(var(--on-surface-variant)/<alpha-value>)',
  'inverse-surface': 'oklch(var(--inverse-surface)/<alpha-value>)',
  'inverse-on-surface': 'oklch(var(--inverse-on-surface)/<alpha-value>)',
  outline: 'oklch(var(--outline)/<alpha-value>)',
  'outline-variant': 'oklch(var(--outline-variant)/<alpha-value>)',
  shadow: 'oklch(var(--shadow)/<alpha-value>)',
  scrim: 'oklch(var(--scrim)/<alpha-value>)',
  'surface-tint': 'oklch(var(--surface-tint)/<alpha-value>)',
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
    DEFAULT: 'oklch(var(--surface-container-lowest))',
    foreground: 'oklch(var(--on-surface))',
  },
  muted: {
    DEFAULT: 'oklch(var(--on-secondary)/<alpha-value>)',
    foreground: 'oklch(var(--secondary)/<alpha-value>)',
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
    DEFAULT: 'oklch(var(--surface-container))',
    foreground: 'oklch(var(--on-surface))',
    primary: 'oklch(var(--primary))',
    'primary-foreground': 'oklch(var(--on-primary))',
    accent: 'oklch(var(--accent))',
    'accent-foreground': 'oklch(var(--on-accent))',
    border: 'oklch(var(--surface-container-high))',
    ring: 'oklch(var(--outline-variant))',
  },
};

const PALETTE_COLORS = {
  ...generateMUIColorVariants('primary'),
  ...generateMUIColorVariants('secondary'),
  ...generateMUIColorVariants('accent'),
  ...generateMUIColorVariants('error'),
  ...MUI_SURFACE_TOKENS,
  ...['primary', 'secondary', 'accent', 'error'].reduce<
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
};

export { DEFAULT_UTILITY_VALUES, SHADCN_COLOR_UTILITIES, PALETTE_COLORS };
