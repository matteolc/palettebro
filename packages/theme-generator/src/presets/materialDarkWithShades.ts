import complementary from "../nodes/complementary";
import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialNeutralDark from "./materialNeutralDark";
import materialTonesDark from "./materialTonesDark";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleDark from "./tailwindScaleDark";
import baseDark from "./baseDark";
import tetradLeft from "../nodes/tetradLeft";
import neutralScaleDark from "./neutralScaleDark";

export default (options?: { saturation?: number }) =>
  ({
    label: "Material dark with shades",
    description: "Variations inspired by Material You for dark themes",
    nodes: [
      {
        type: saturation.type,
        token: "primary",
        isHidden: true,
        args: {
          amount: options?.saturation ?? 80,
        },
        children: [
          ...materialTonesDark.nodes,
          ...tailwindScaleDark.nodes,
          {
            type: tetradLeft.type,
            token: "accent",
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: complementary.type,
            token: "secondary",
            isHidden: true,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: negative.type,
            token: "error",
            isHidden: true,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: informative.type,
            token: "info",
            isHidden: true,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: positive.type,
            token: "success",
            isHidden: true,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: warning.type,
            token: "warning",
            isHidden: true,
            children: [...materialTonesDark.nodes, ...tailwindScaleDark.nodes],
          },
          {
            type: saturation.type,
            token: "neutral",
            args: {
              amount: 5,
            },
            children: [
              ...materialTonesDark.nodes,
              ...materialNeutralDark.nodes,
              ...neutralScaleDark.nodes,
              ...baseDark.nodes,
            ],
          },
        ],
      },
    ],
  } as Preset);
