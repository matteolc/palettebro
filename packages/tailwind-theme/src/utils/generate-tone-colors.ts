import { interpolateBlackWhite } from './interpolate-black-white';
import { colorToRawOklchString } from './oklch';

const SHADES = {
  50: 0.95,
  100: 0.87,
  200: 0.7,
  300: 0.5,
  400: 0.2,
  600: 0.17,
  700: 0.3,
  800: 0.5,
  900: 0.65,
  950: 0.75,
};

const generateToneColors = (color: string, key: string) => {
  const result: Record<string, string> = {
    [`${key}-500`]: colorToRawOklchString(color),
  };
  for (const variant of [50, 100, 200, 300, 400]) {
    result[`${key}-${variant}`] = interpolateBlackWhite(
      color,
      SHADES[variant as keyof typeof SHADES],
    );
  }
  for (const variant of [600, 700, 800, 900, 950]) {
    result[`${key}-${variant}`] = interpolateBlackWhite(
      color,
      SHADES[variant as keyof typeof SHADES],
      'black',
    );
  }

  return result;
};

export { generateToneColors };
