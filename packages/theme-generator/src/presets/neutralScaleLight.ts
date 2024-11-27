import saturation from "../nodes/saturation";
import tailwindScaleLight from "./tailwindScaleLight";
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
      children: [...tailwindScaleLight.nodes],
    },
  ],
} as Preset;
