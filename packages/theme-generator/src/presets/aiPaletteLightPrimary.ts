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
import spotTonesLight from "./spotTonesLight";

export default (options?: { saturation?: number, lightness?: number }) =>
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
          token: "primary",
          args: {
            amount: options?.lightness ?? 50,
          },
          children: [
            ...tailwindScaleLight.nodes,
            ...spotTonesLight.nodes,
            {
              type: saturation.type,
              isHidden: false,
              token: "neutral",
              args: {
                amount: 5,
              },
              children: [
                  ...spotTonesLight.nodes,
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
                ...spotTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
            {
              type: informative.type,
              token: "info",
              isHidden: false,
              children: [
                ...spotTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
            {
              type: positive.type,
              token: "success",
              isHidden: false,
              children: [
                ...spotTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
            {
              type: warning.type,
              token: "warning",
              isHidden: false,
              children: [
                ...spotTonesLight.nodes,
                ...tailwindScaleLight.nodes,
              ],
            },
          ],
        },
      ],
    },
  ],
} as Preset);
