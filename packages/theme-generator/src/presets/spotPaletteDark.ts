import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesDark from "./materialTonesDark";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleDark from "./tailwindScaleDark";
import tetradLeft from "../nodes/tetradLeft";
import lightness from "../nodes/lightness";
import tetradRight from "../nodes/tetradRight";
import highlight from "../nodes/highlight";
import baseDark from "./baseDark";

export default (options?: { saturation?: number }) =>
  ({
    label: "Spot palette",
    description: "A spot palette with a primary color",
    nodes: [
      {
        type: lightness.type,
        isHidden: true,
        token: "primary",
        args: {
          amount: 100,
        },
        children: [
          ...tailwindScaleDark.nodes,
          ...materialTonesDark.nodes,
          {
            type: negative.type,
            token: "error",
            isHidden: false,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: informative.type,
            token: "info",
            isHidden: false,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: positive.type,
            token: "success",
            isHidden: false,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: warning.type,
            token: "warning",
            isHidden: false,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
        ],
      },
      {
        type: lightness.type,
        isHidden: true,
        args: {
          amount: 70,
        },
        children: [
          {
            type: saturation.type,
            isHidden: true,
            args: {
              amount: 30,
            },
            children: [
              ...baseDark.nodes,
              {
                type: highlight.type,
                isHidden: true,
                token: "neutral",
                args: {
                  amount: 15,
                },
                children: [
                  ...materialTonesDark.nodes,
                  ...tailwindScaleDark.nodes,
                ],
              },
            ],
          },
          {
            type: tetradLeft.type,
            token: "secondary",
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: tetradRight.type,
            token: "accent",
            isHidden: false,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
        ],
      },
    ],
  } as Preset);
