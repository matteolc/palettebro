# @palettebro/tailwind-theme

A powerful Tailwind CSS plugin for managing color themes with OKLCH color space support.

## Features

- 🎨 Dynamic theme switching with CSS custom properties
- 🌗 Built-in dark mode support
- 🎯 Semantic color tokens (primary, secondary, accent, etc.)
- 🔧 Utility classes for common design patterns
- 🎭 Support for multiple themes
- 📱 Automatic dark theme detection

## Installation

```bash
pnpm add @palettebro/tailwind-theme
```

## Usage

Define your themes:

```ts
// themes.ts
import type { Themes } from '@palettebro/theme-generator/types';
import { ThemeVariantEnum, StaticThemePresetEnum } from '@palettebro/theme-generator/types';
import colors from 'tailwindcss/colors';

const themes = {
  light: {
    'color-scheme': 'light' as const,
    variant: ThemeVariantEnum.static,
    debug: false,
    preset: StaticThemePresetEnum.tetrad,
    reverse: true,
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
  dark: {
    'color-scheme': 'dark' as const,
    variant: ThemeVariantEnum.static,
    debug: false,
    preset: StaticThemePresetEnum.tetrad,
    reverse: true,
    baseColors: {
      primary: colors.purple[500],
      secondary: colors.blue[500],
      accent: colors.green[500],
    },
  },
} satisfies Themes;
```

Add the plugin to your Tailwind config:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { themes } from './themes';

const config: Config = {
    darkMode: 'class',
    content: [
        // ...your content configuration
    ],
    plugins: [
        require('@palettebro/tailwind-theme')({
            themes,
            utils: true,
            darkTheme: true,
        }),
    ],
};

export default config;
```


## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `themes` | `Themes` | Required | Theme configurations |
| `utils` | `boolean` | `false` | Enable utility classes |
| `darkTheme` | `boolean` | `false` | Enable automatic dark theme detection |

## Available Color Tokens

The plugin provides semantic color tokens that can be used in your Tailwind classes:

- `primary` - Primary brand color
- `secondary` - Secondary brand color
- `accent` - Accent color
- `error` - Error color

Each color token includes variants:

- Default (e.g., `bg-primary`)
- Content (e.g., `text-primary-content`)
- Foreground (e.g., `text-primary-foreground`)
- Container (e.g., `bg-primary-container`)
- Light/Base/Dark (e.g., `bg-primary-light`)
- Shades (50-900) (e.g., `bg-primary-100`)

And many more (TBD)

## Utility Classes

When `utils: true` is enabled, the plugin provides additional utility classes.

## Theme Switching

Themes can be switched using the `data-theme` attribute:

```html
<div data-theme="light">Light theme content</div>
<div data-theme="dark">Dark theme content</div>
```

## License

MIT