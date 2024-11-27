import { highlightColor } from "../color/manipulation";
import type { NodeDef } from "./types";

export default {
  type: "hlt",
  label: "Highlight",
  argsLabel: ({ amount }) => `${amount}%`,
  params: [
    {
      type: "range",
      name: "amount",
      label: "Amount",
      unit: "%",
      min: 0,
      max: 50,
      default: 10,
    },
    {
      type: "range",
      name: "shift",
      label: "Hue shift",
      unit: "%",
      min: 0,
      max: 100,
      default: 15,
    },
    {
      type: "range",
      name: "temp",
      label: "Temperature",
      unit: "0K", // hacky shit
      min: 550,
      max: 750,
      default: 650,
    },
  ],
  samples: "continuous",
  apply(color, { amount, shift, temp }) {
    return highlightColor(color, temp * 100, amount, shift);
  },
} as NodeDef;
