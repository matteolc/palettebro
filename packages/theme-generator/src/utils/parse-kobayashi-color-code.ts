import { KOBAYASHI_COLOR_MAP } from '../const';

/**
 * Parses a Kobayashi color code and returns the corresponding hex color.
 * Handles both neutral colors (N) and hue/tone combinations (e.g., "R/P").
 * @param colorCode - The Kobayashi color code to parse
 * @returns The hex color string or empty string if invalid
 */
export function parseKobayashiColorCode(colorCode: string): string {
  if (!colorCode) return '';

  // Handle neutral colors (N) differently as they don't use the slash format
  if (colorCode.startsWith('N')) {
    const hue = 'N' as const;
    const tone = colorCode.slice(1) as keyof (typeof KOBAYASHI_COLOR_MAP)['N'];
    return KOBAYASHI_COLOR_MAP[hue][tone];
  }

  // Split the color code into hue and tone (e.g., "R/P" -> ["R", "P"])
  const [hue, tone] = colorCode.split('/') as [
    keyof typeof KOBAYASHI_COLOR_MAP,
    string,
  ];

  return KOBAYASHI_COLOR_MAP[hue][
    tone as keyof (typeof KOBAYASHI_COLOR_MAP)[keyof typeof KOBAYASHI_COLOR_MAP]
  ];
} 