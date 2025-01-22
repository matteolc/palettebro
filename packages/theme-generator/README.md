# @palettebruh/theme-generator

A powerful color palette generator with support for Material You-inspired themes, OKLCH color space, and dynamic color relationships.

## Features

- 🎨 Multiple theme generation strategies:
  - Material You-inspired themes
  - Static color relationships (complementary, split-complementary, etc.)
  - Dynamic AI-powered palettes
- 🌈 OKLCH color space support for better perceptual uniformity
- 🎯 Semantic color tokens (primary, secondary, accent, etc.)
- 🔧 Built-in color manipulation utilities
- 🎭 Support for light and dark themes
- 📱 Automatic contrast checking (WCAG 2.0 and 3.0)

## Installation

```bash
pnpm add @palettebruh/theme-generator
```

## Usage

### Basic Theme Generation

```ts
import { usePalette } from '@palettebruh/theme-generator/palettes';
import { ThemeVariantEnum } from '@palettebruh/theme-generator/types';

const { palette } = usePalette({
  theme: {
    'color-scheme': 'light',
    variant: ThemeVariantEnum.static,
    preset: 'split-complementary',
    baseColors: {
      primary: '#663399', // Your primary color
    },
  },
});
```

### Theme Configuration

The theme generator supports several configuration options:

```ts
type Theme = {
  'color-scheme': 'light' | 'dark';
  variant: 'mui' | 'static' | 'dynamic';
  preset?: 'split-complementary' | 'tetrad' | 'triad';
  reverse?: boolean;
  debug?: boolean;
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
};
```


### Available Color Tokens

The generator provides semantic color tokens that follow Material Design principles:

- Base Colors:
  - `primary` - Primary brand color
  - `secondary` - Secondary brand color
  - `accent` - Accent color

- Status Colors:
  - `info` - Information color
  - `success` - Success color
  - `warning` - Warning color
  - `error` - Error color

Each color token includes variants:
- Default (e.g., `primary`)
- Container (e.g., `primary-container`)
- On Container (e.g., `on-primary-container`)
- Light/Base/Dark (e.g., `primary-light`)
- Shades (50-950) (e.g., `primary-100`)

### Color Manipulation Utilities

The generator includes utility functions for color manipulation:

- `adjustColor`: Adjusts the lightness, saturation, or hue of a color.
- `mixColors`: Mixes two colors to create a new color.
- `contrastColor`: Finds the best contrasting color for a given color.

```ts
import {
  colorToRawOklchString,
  formatSchemistToHex,
  parseColor
} from '@palettebruh/theme-generator';

// Convert colors between formats
const oklchColor = colorToRawOklchString('#663399');
const hexColor = formatSchemistToHex(oklchColor);

// Parse colors
const [format, color] = parseColor('#663399');
```

### Contrast Checking

The generator includes a function to check the contrast between two colors:

```ts
import {
  wcag2Contrast,
  wcag3Contrast,
  wcag2ContrastGrade,
  wcag3ContrastGrade
} from '@palettebruh/theme-generator';

const contrast = wcag2Contrast(backgroundColor, foregroundColor);
const grade = wcag2ContrastGrade(backgroundColor, foregroundColor);
```


## Theme Variants

```ts
enum ThemeVariantEnum {
  mui = 'mui',
  static = 'static',
  dynamic = 'dynamic',
}
```

### Material You (MUI)
Inspired by Material Design's dynamic color system:

- `mui` - Generates a theme based on the primary color and its dynamic relationships.

### Static Theme
Uses a fixed set of colors based on the preset:

- `static` - Generates a theme based on the preset and base colors.

```ts
{
  variant: ThemeVariantEnum.static,
  preset: 'split-complementary',
  'color-scheme': 'light',
  baseColors: {
    primary: '#663399'
  }
}
```

### Dynamic Theme
Uses AI to generate a palette based on the preset and base colors:

- `dynamic` - Generates a theme based on the preset and base colors.

```ts
{
  variant: ThemeVariantEnum.dynamic,
  'color-scheme': 'light',
}
```

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

MIT