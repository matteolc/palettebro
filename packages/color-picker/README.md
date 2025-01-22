# @palettebro/color-picker

A versatile color picker component library for React applications, supporting multiple color formats and providing an intuitive interface for color selection.

## Features

- Multiple color format support:
  - RGB
  - HSL
  - LCH
  - CSS (Hex, RGB, HSL)
  - Tailwind colors
  - Pantone colors
  - RAL colors

## Installation

```bash
pnpm add @palettebro/color-picker
```

## Usage

```tsx
import { ColorPicker } from '@palettebro/color-picker';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState('#FF0000');
  return (
    <ColorPicker
      value={color}
      onChange={(newColor) => setColor(newColor)}
    />
  );
}

export default App;
```


## Props

### ColorPicker

| Prop | Type | Description |
|------|------|-------------|
| value | `string` | The current color value (hex, rgb, hsl, or lch format) |
| onChange | `(value: string) => void` | Callback function when color changes. Returns the new color in HEX format |

## Color Formats

### RGB Picker
Uses RGB sliders (0-255) for Red, Green, and Blue channels.

### HSL Picker
Provides HSL sliders for:
- Hue (0-360°)
- Saturation (0-100%)
- Lightness (0-100%)

### LCH Picker
Offers LCH sliders for:
- Lightness (0-100)
- Chroma (0-100)
- Hue (0-360°)

### CSS Color Picker
Accepts any valid CSS color format:
- Hex (#RRGGBB)
- RGB (rgb(r, g, b))
- HSL (hsl(h, s%, l%))

### Tailwind Colors
Provides a grid of Tailwind CSS default colors.

### Pantone Colors
Offers a selection of Pantone color swatches.

### RAL Colors
Includes a collection of RAL color standards.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
