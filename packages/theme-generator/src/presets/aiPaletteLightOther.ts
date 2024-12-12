import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesLight from "./materialTonesLight";
import tailwindScaleLight from "./tailwindScaleLight";
import lightness from "../nodes/lightness";
import spotTonesLight from "./spotTonesLight";

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
            ...tailwindScaleLight.nodes,
            ...spotTonesLight.nodes,
          ],
        },
      ]
    },
  ],
} as Preset);
