# @palettebro/theme-toolbar

A React component library for managing and customizing color palettes in your application.

## Features

- Dynamic and static color palette generation
- WCAG 2.2 and 3.0 contrast grade checking
- Color swatch management with lock/unlock functionality
- Light/dark mode toggle
- Favorites system for saving color combinations
- Customizable presets and profiles
- Responsive design with mobile support

## Installation

```bash
pnpm add @palettebro/theme-toolbar
```

## Usage

```tsx
import { PaletteProvider, PaletteToolbar, GenerativePaletteContextProvider } from '@palettebro/theme-toolbar';

function App() {
  return (
    <PaletteProvider themes={themes}>
      <GenerativePaletteContextProvider>
        <PaletteToolbar
          FormComponent={FormComponent}
          useFetcher={useFetcher}
          generateEndpoint="/generate"
          favouritesEndpoint="/favourites"
        />
      </GenerativePaletteContextProvider>
    </PaletteProvider>
  );
}
```

## Components

### PaletteProvider

Provides theme context to the application.

```tsx
<PaletteProvider themes={themes} lightOrDark="light">
  {children}
</PaletteProvider>
```

### PaletteToolbar

The main toolbar component for managing colors.

```tsx
<PaletteToolbar
  FormComponent={FormComponent}
  useFetcher={useFetcher}
  generateEndpoint="/generate"
  favouritesEndpoint="/favourites"
/>
```

## Color Tokens

### Base Tokens
- primary
- secondary
- accent

### Status Tokens
- info
- success
- warning
- error

## Features

### Static Palette Generation
- Split Complementary
- Tetrad
- Triad
- Reverse option

### Dynamic Palette Generation
Presets:
- Default
- High Contrast
- Bright Light
- Pastel
- Vibrant
- Dark
- Hyper Color

Targets:
- Website Magazine
- Brand 2
- Brand 3
- Website 1

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT