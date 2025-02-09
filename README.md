# PaletteBruh Documentation

Welcome to the official documentation for PaletteBruh, a comprehensive color palette management system for modern web applications.

## Features

- **Color Picker**: Advanced color selection with support for multiple formats (RGB, HSL, LCH, CSS, Tailwind, Pantone, RAL)
- **Theme Generator**: Create dynamic and static color palettes with WCAG compliance
- **Theme Toolbar**: Interactive UI components for real-time color management
- **Tailwind Integration**: Seamless integration with Tailwind CSS for theme management
- **AI-Powered Suggestions**: Generative color palette recommendations using machine learning

## Packages

### @palettebro/theme-generator
Core package for generating color palettes with WCAG compliance and AI-powered suggestions.

[Learn more about theme-generator →](../packages/theme-generator)

### @palettebro/theme-toolbar
React components for managing and customizing color palettes with features like WCAG contrast checking and favorites system.

[Learn more about theme-toolbar →](../packages/theme-toolbar)

### @palettebro/color-picker
A versatile color picker component supporting multiple color formats and providing an intuitive interface for color selection.

[Learn more about color-picker →](../packages/color-picker)

### @palettebro/tailwind-theme
Tailwind CSS plugin for implementing dynamic theming with semantic color tokens and utility classes.

[Learn more about tailwind-theme →](../packages/tailwind-theme)

## TL;DR: Getting Started

1. Install the core packages:

```bash
pnpm add @palettebro/theme-generator
```

2. Define your themes:

```tsx
// themes.ts
import type { Themes } from '@palettebro/theme-generator';
import { ThemeVariantEnum, StaticThemePresetEnum } from '@palettebro/theme-generator';

const themes = {
  light: {
    'color-scheme': 'light' as const,
    variant: ThemeVariantEnum.static,
    preset: StaticThemePresetEnum.tetrad,
    baseColors: {
      primary: '#0066ff',
    },
  },
  dark: {
    'color-scheme': 'dark' as const,
    variant: ThemeVariantEnum.static,
    preset: StaticThemePresetEnum.tetrad,
    baseColors: {
      primary: '#0066ff',
    },
  },
} satisfies Themes;
```

3. Use Palettebro to inject the generated CSS tokens into your project:

```tsx
import { useCustomPalette } from '@palettebro/theme-generator';

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme(); // Get the dark/light theme from your theme provider
	useCustomPalette({
		themes,
		isDark: theme === "dark",
	});
  
  return (
    <html className={theme}>
      <body>
        {children}
      </body>
    </html>
  )
}
```

Tip: Use the `debug` option to log the generated CSS tokens in the Chrome DevTools.

## Use Palettebro toolbar in your project

[Learn more about theme-toolbar →](../packages/theme-toolbar)

### Use Palettebro with Tailwind CSS

[Learn more about tailwind-theme →](../packages/tailwind-theme)

## Framework Integration

### Remix Method Signatures

The Palettebro toolbar requires these Remix-like signatures:

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
