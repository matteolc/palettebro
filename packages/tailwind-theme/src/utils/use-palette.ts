import {
  BackgroundColor,
  Color,
  Theme,
  // contrast as getContrast,
  type CssColor,
} from "@adobe/leonardo-contrast-colors";
import type { Theme as CustomTheme } from "@repo/theme-generator/types";
import twColors from "tailwindcss/colors";
import chroma from "chroma-js";

// export const BASE_RATIOS = [
//   -1.1, 1, 1.12, 1.25, 1.45, 1.75, 2.25, 3.01, 4.52, 7, 11,
// ];
export const BASE_RATIOS = [
  -1.1, 1.12, 1.45, 1.8, 2.25, 3.2, 4.8, 6.4, 8.3, 13.2, 15.2,
];

// const isDark = (color: CssColor) =>
//   getContrast(chroma(color).rgb(), chroma(twColors.white).rgb()) > 4.5;

export const usePalette = (theme: CustomTheme) => {
  const {
    baseColors,
    ratios: themeRatios,
    smooth,
    lightness,
    saturation,
    contrast,
  } = theme;

  const colors: Color[] = [];
  const colorspace = "LCH";
  const ratios = themeRatios ?? BASE_RATIOS;

  for (const [name, color] of Object.entries(baseColors)) {
    colors.push(
      ...[
        new Color({
          name: `${name}-`,
          colorKeys: [color as CssColor],
          smooth,
          ratios,
          colorspace,
        }),
        new Color({
          name: `on-${name}-`,
          colorKeys: [
            chroma(color as CssColor)
              .luminance(0.2, "oklch")
              .hex() as CssColor,
          ],
          smooth,
          ratios: [1],
          colorspace,
        }),
      ]
    );
  }

  for (const name of ["info", "success", "warning", "error"] as const) {
    const color = {
      info: twColors.blue[500],
      success: twColors.green[500],
      warning: twColors.yellow[500],
      error: twColors.red[500],
    }[name];
    colors.push(
      ...[
        new Color({
          name: `${name}-`,
          colorKeys: [color],
          smooth,
          ratios,
          colorspace,
        }),
        new Color({
          name: `on-${name}-`,
          colorKeys: [
            chroma(color as CssColor)
              .luminance(0.2, "oklch")
              .hex() as CssColor,
          ],
          smooth,
          ratios: [1],
          colorspace,
        }),
      ]
    );
  }

  colors.push(
    ...[
      new Color({
        name: "base-",
        colorKeys: [
          chroma
            .mix(
              baseColors.primary as CssColor,
              baseColors.secondary as CssColor,
              0.5,
              "lab"
            )
            .mix(baseColors.accent as CssColor, 0.2, "lab")
            .hex() as CssColor,
        ],
        smooth,
        ratios,
        colorspace,
      }),
    ]
  );

  const grayScale = new BackgroundColor({
    name: "gray-",
    colorKeys: [twColors.gray[100]],
    colorspace,
    ratios,
  });

  // A value of lightness bewteen 0 and 30 indicates a dark theme
  // A value of lightness between 85 and 100 indicates a light theme
  return new Theme({
    colors,
    backgroundColor: grayScale,
    lightness: lightness ?? 50,
    contrast,
    saturation,
    output: "HSL",
  });
};
