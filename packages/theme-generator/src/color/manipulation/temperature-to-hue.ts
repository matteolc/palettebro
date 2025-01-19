// @see http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code
// @see https://gist.github.com/EDais/1ba1be0fe04eca66bbd588a6c9cbd666

import { clamp } from '../../utils/math';
import { rgbToSchemist } from '../conversion';

export const temperatureToHue = (kelvins: number): number => {
  const temperature = clamp(kelvins, 40000, 1000) / 100;
  const r =
    temperature <= 66
      ? 255
      : clamp(329.698727446 * (temperature - 60) ** -0.1332047592, 255);

  const g =
    temperature <= 66
      ? clamp(99.4708025861 * Math.log(temperature) - 161.1195681661, 255)
      : clamp(288.1221695283 * (temperature - 60) ** -0.0755148492, 255);

  const b =
    temperature >= 66
      ? 255
      : temperature <= 19
        ? 0
        : clamp(
            138.5177312231 * Math.log(temperature - 10) - 305.0447927307,
            255,
          );

  const color = rgbToSchemist({
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  });

  // @TODO undefined HUE at 6600K
  // return 95.09736692688655; // temperatureToHue(6504)

  return color.h;
};
