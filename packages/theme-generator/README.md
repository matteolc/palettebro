# @palettebro/theme-generator

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

## Credits

- This package was heavily inspired by [Schemist](https://schemist.fglt.fr/) so huge thanks to the [creator](https://github.com/felixgirault) for the awesome work.
- The Huemint palette generator uses the [Huemint API](https://huemint.com) to generate palettes.
- The Kobayashi palette generator is inspired by the book **Color Image Scale** by Shigenobu Kobayashi.
- The Material UI palette generator uses the [Material UI Color Utilities](https://github.com/material-foundation/material-color-utilities) package to generate palettes.

## Installation

```bash
pnpm add @palettebro/theme-generator
```

## Usage

### Basic Theme Generation

```ts
import { usePalette } from '@palettebro/theme-generator/palettes';
import { ThemeVariantEnum } from '@palettebro/theme-generator/types';

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

The theme generator supports several configuration options. Refer to the [types](https://github.com/palettebro/palettebro/blob/main/packages/theme-generator/src/types.ts) for more details.

### Available Color Tokens

The generator provides semantic color tokens that follow [Material Design principles](https://m3.material.io/styles/color/system/overview).
By using the generated color tokens you can create component color tokens that are consistent with the theme.

## Theme Variants

```ts
enum ThemeVariantEnum {
  mui = 'mui',
  static = 'static',
  dynamic = 'dynamic',
  kobayashi = 'kobayashi',
  generative = 'generative',
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