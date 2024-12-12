import contrasting from "../nodes/contrasting";
import lightness from "../nodes/lightness";
import type { Preset } from "./types";

// @see https://m3.material.io/styles/color/the-color-system/tokens
export default {
  label: "Spot tones light",
  description: "Tone variations for light themes",
  nodes: [
    {
        type: contrasting.type,
        token: "on-$",
      },
  ],
} as Preset;
