import lightness from "../nodes/lightness";
import type { Preset } from "./types";

// @see https://m3.material.io/styles/color/the-color-system/tokens
export default {
  label: "Material tones light",
  description: "Tone variations for light themes",
  nodes: [
    {
      type: lightness.type,
      token: "$",
      args: {
        amount: 40,
      },
    },
    {
      type: lightness.type,
      token: "on-$",
      args: {
        amount: 100,
      },
    },
    {
      type: lightness.type,
      token: "$-container",
      args: {
        amount: 90,
      },
    },
    {
      type: lightness.type,
      token: "on-$-container",
      args: {
        amount: 10,
      },
    },
  ],
} as Preset;
