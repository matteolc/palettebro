import saturation from "../nodes/saturation";
import tailwindScaleDark from "./tailwindScaleDark";
import type { Preset } from "./types";

export default {
  label: "Neutral",
  description: "Desaturated color with various lightness levels",
  nodes: [
    {
      type: saturation.type,
      isHidden: true,
      token: "neutral",
      args: {
        amount: 5,
      },
      children: [...tailwindScaleDark.nodes],
    },
  ],
} as Preset;
