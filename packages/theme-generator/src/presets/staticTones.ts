import contrasting from "../nodes/contrasting";
import lightness from "../nodes/lightness";
import states from "./states";
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
    {
      type: lightness.type,
      token: "$-container",
      args: {
        amount: 30,
      },
    },
    {
      type: lightness.type,
      token: "on-$-container",
      args: {
        amount: 90,
      },
    },
  ],
} as Preset;
