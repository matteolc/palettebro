# PaletteBruh Documentation

Welcome to the official documentation for PaletteBruh, a comprehensive color palette management system for modern web applications.

## Features

- **Color Picker**: Advanced color selection with support for multiple formats (RGB, HSL, LCH, CSS, Tailwind, Pantone, RAL)
- **Theme Generator**: Create dynamic and static color palettes with WCAG compliance
- **Theme Toolbar**: Interactive UI components for real-time color management
- **Tailwind Integration**: Seamless integration with Tailwind CSS for theme management
- **AI-Powered Suggestions**: Generative color palette recommendations using machine learning

## Packages

### @palettebro/color-picker
A versatile color picker component supporting multiple color formats and providing an intuitive interface for color selection.

[Learn more about color-picker →](../packages/color-picker)

### @palettebro/theme-toolbar
React components for managing and customizing color palettes with features like WCAG contrast checking and favorites system.

[Learn more about theme-toolbar →](../packages/theme-toolbar)

### @palettebro/tailwind-theme
Tailwind CSS plugin for implementing dynamic theming with semantic color tokens and utility classes.

[Learn more about tailwind-theme →](../packages/tailwind-theme)

### @palettebro/theme-generator
Core package for generating color palettes with WCAG compliance and AI-powered suggestions.

[Learn more about theme-generator →](../packages/theme-generator)


## Getting Started

1. Install the core packages:

```bash
pnpm add @palettebro/color-picker @palettebro/theme-toolbar @palettebro/tailwind-theme @palettebro/theme-generator
```

### Using Palettebro toolbar in your project

Define your themes:

```tsx
// themes.ts
import type { Themes } from '@palettebro/theme-generator';
import { ThemeVariantEnum, StaticThemePresetEnum } from '@palettebro/theme-generator';
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

Configure Tailwind CSS:

```tsx
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { themes } from './themes';

const config: Pick<
  Config,
  'content' | 'theme' | 'variants' | 'plugins' | 'darkMode'
> = {
  darkMode: 'class',
  content: [
    './app/**/*.tsx',
    '../../packages/color-picker/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/theme-toolbar/src/**/*.{js,ts,jsx,tsx}',
    '!../../packages/**/node_modules',
  ],
  plugins: [
    require('@palettebro/tailwind-theme')({
      themes,
      utils: true,
      addThemes: false,
    }),
  ],
};
```

Use the Palette provider to wrap your application:

```tsx
import {
  KobayashiPaletteContextProvider,
  PaletteProvider,
  PaletteToolbar,
  GenerativePaletteContextProvider,
} from '@palettebro/theme-toolbar';
import type { FormProps as ToolbarFormProps } from '@palettebro/theme-toolbar/types';

function App() {
  return (
    <PaletteProvider lightOrDark={'dark'} themes={themes}>
      <main>
        {/ Your application components /}
        <GenerativePaletteContextProvider>
          <KobayashiPaletteContextProvider>
            <PaletteToolbar
              FormComponent={FormWrapper}
              useFetcher={useFetcher}
            />
          </KobayashiPaletteContextProvider>
        </GenerativePaletteContextProvider>
      </main>
    </PaletteProvider>
  );
}
```

Framework notes:

### Using Palettebro with Tailwind CSS

Configure Tailwind:

```tsx
// tailwind.config.ts
import { createTailwindTheme } from '@palettebro/tailwind-theme';

export default createTailwindTheme({
  primary: '#0066ff',
  secondary: '#ff6600',
  // ... other theme configurations
});
```

## Framework Integration

### Remix Method Signatures
The PaletteToolbar requires these Remix-like signatures:
```tsx
type FormProps = {
  action?: string;
  method?: 'post' | 'get';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

type Fetcher = {
  Form: React.ComponentType<FormProps>;
  submit: (
    data: FormData,
    options: { method: 'post' | 'get'; action: string }
  ) => void;
};

function useFetcher(): Fetcher;
```

### Next.js Implementation Example
For Next.js App Router, create these adapters:

```tsx
// components/form-wrapper.tsx
'use client';

export function FormWrapper({ action, method, onSubmit, children }: FormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
    
    const formData = new FormData(e.currentTarget);
    await fetch(action || '', {
      method: method || 'post',
      body: formData,
    });
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
}

// hooks/use-fetcher.ts
import { FormWrapper } from '@/components/form-wrapper';

export function useFetcher() {
  return {
    Form: FormWrapper,
    submit: async (data: FormData, options: { method: 'post' | 'get'; action: string }) => {
      await fetch(options.action, {
        method: options.method,
        body: data,
      });
    },
  };
}
```

Then use in your App component:
```tsx
function App() {
  const useFetcher = () => ({
    Form: FormWrapper,
    submit: (data, options) => fetch(options.action, {
      method: options.method,
      body: data,
    }),
  });

  return (
    <PaletteProvider lightOrDark={'dark'} themes={themes}>
      {/* ... */}
      <PaletteToolbar
        FormComponent={FormWrapper}
        useFetcher={useFetcher}
      />
    </PaletteProvider>
  );
}
```

Note: You'll need to create corresponding API routes in Next.js (e.g., `/api/palette`) to handle the form submissions.

## Documentation

For detailed information on each package, including API references, usage examples, and best practices, please refer to the individual package READMEs.

## License

PaletteBruh is open source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
