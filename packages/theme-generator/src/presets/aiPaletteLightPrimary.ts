import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesLight from "./materialTonesLight";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleLight from "./tailwindScaleLight";
import lightness from "../nodes/lightness";
import baseLight from "./baseLight";
import neutralScaleLight from "./neutralScaleLight";
import materialNeutralLight from "./materialNeutralLight";

export default (options?: { saturation?: number, lightness?: number }) =>
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
          token: "primary",
          args: {
            amount: options?.lightness ?? 100,
          },
          children: [
            ...tailwindScaleLight.nodes,
            ...materialTonesLight.nodes,
            {
              type: saturation.type,
              isHidden: true,
              token: "neutral",
              args: {
                amount: 5,
              },
              children: [
                  ...materialTonesLight.nodes,
                  ...materialNeutralLight.nodes,
                  ...neutralScaleLight.nodes,
                  ...baseLight.nodes,
              ],
            },
            {
              type: negative.type,
              token: "error",
              isHidden: false,
              children: [
                ...materialTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
            {
              type: informative.type,
              token: "info",
              isHidden: false,
              children: [
                ...materialTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
            {
              type: positive.type,
              token: "success",
              isHidden: false,
              children: [
                ...materialTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
            {
              type: warning.type,
              token: "warning",
              isHidden: false,
              children: [
                ...materialTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
          ],
        },
      ],
    },
  ],
} as Preset);
