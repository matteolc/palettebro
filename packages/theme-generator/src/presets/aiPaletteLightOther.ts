import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesLight from "./materialTonesLight";
import tailwindScaleLight from "./tailwindScaleLight";
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
            ...tailwindScaleLight.nodes,
            ...materialTonesLight.nodes,
          ],
        },
      ],
    },
  ],
} as Preset);
