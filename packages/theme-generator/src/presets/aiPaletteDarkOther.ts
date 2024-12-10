import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesDark from "./materialTonesDark";
import tailwindScaleDark from "./tailwindScaleDark";
import lightness from "../nodes/lightness";

export default (options: { token: string, saturation?: number, lightness?: number }) =>
({
  label: "Spot palette",
  description: "A spot palette with a primary color",
  nodes: [
    {
      type: saturation.type,
      isHidden: true,
      args: {
        amount: options?.saturation ?? 90,
      },
      children: [
        {
          type: lightness.type,
          isHidden: true,
          token: options.token,
          args: {
            amount: options?.lightness ?? 100,
          },
          children: [
            ...tailwindScaleDark.nodes,
            ...materialTonesDark.nodes,
          ],
        },
      ],
    },
  ],
} as Preset);
