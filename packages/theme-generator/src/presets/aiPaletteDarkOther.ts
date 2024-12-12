import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesDark from "./materialTonesDark";
import tailwindScaleDark from "./tailwindScaleDark";
import lightness from "../nodes/lightness";
import spotTonesDark from "./spotTonesDark";

export default (options: { token: string, saturation?: number, lightness?: number }) =>
({
  label: "Spot palette",
  description: "A spot palette with a primary color",
  nodes: [
    {
      type: saturation.type,
      isHidden: true,
      args: {
        amount: options?.saturation ?? 100,
      },
      children: [
        {
          type: lightness.type,
          isHidden: false,
          token: options.token,
          args: {
            amount: options?.lightness ?? 50,
          },
          children: [
            ...tailwindScaleDark.nodes,
            ...spotTonesDark.nodes,
          ],
        },
      ]
    },
  ],
} as Preset);
