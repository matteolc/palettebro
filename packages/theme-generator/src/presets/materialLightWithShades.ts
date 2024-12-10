import complementary from "../nodes/complementary";
import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialNeutralLight from "./materialNeutralLight";
import materialTonesLight from "./materialTonesLight";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleLight from "./tailwindScaleLight";
import neutralScaleLight from "./neutralScaleLight";
import baseLight from "./baseLight";
import tetradLeft from "../nodes/tetradLeft";

export default (options?: { saturation?: number }) =>
  ({
    label: "Material light",
    description: "Variations inspired by Material You for light themes",
    nodes: [
      {
        type: saturation.type,
        token: "primary",
        isHidden: true,
        args: {
          amount: options?.saturation ?? 80,
        },
        children: [
          ...materialTonesLight.nodes,
          ...tailwindScaleLight.nodes,
          {
            type: tetradLeft.type,
            token: "accent",
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: complementary.type,
            token: "secondary",
            isHidden: true,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
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
          {
            type: saturation.type,
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
        ],
      },
    ],
  } as Preset);
