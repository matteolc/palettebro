import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesDark from "./materialTonesDark";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleDark from "./tailwindScaleDark";
import lightness from "../nodes/lightness";
import baseDark from "./baseDark";
import neutralScaleDark from "./neutralScaleDark";
import materialNeutralDark from "./materialNeutralDark";
import spotTonesDark from "./spotTonesDark";

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
            ...tailwindScaleDark.nodes,
            ...spotTonesDark.nodes,
            {
              type: saturation.type,
              isHidden: false,
              token: "neutral",
              args: {
                amount: 5,
              },
              children: [
                  ...spotTonesDark.nodes,
                  ...materialNeutralDark.nodes,
                  ...neutralScaleDark.nodes,
                  ...baseDark.nodes,
              ],
            },
            {
              type: negative.type,
              token: "error",
              isHidden: false,
              children: [
                ...spotTonesDark.nodes,
                ...tailwindScaleDark.nodes,
              ],
            },
            {
              type: informative.type,
              token: "info",
              isHidden: false,
              children: [
                ...spotTonesDark.nodes,
                ...tailwindScaleDark.nodes,
              ],
            },
            {
              type: positive.type,
              token: "success",
              isHidden: false,
              children: [
                ...spotTonesDark.nodes,
                ...tailwindScaleDark.nodes,
              ],
            },
            {
              type: warning.type,
              token: "warning",
              isHidden: false,
              children: [
                ...spotTonesDark.nodes,
                ...tailwindScaleDark.nodes,
              ],
            },
          ],
        },
      ],
    },
  ],
} as Preset);
