import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialTonesLight from "./materialTonesLight";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleLight from "./tailwindScaleLight";
import tetradLeft from "../nodes/tetradLeft";
import lightness from "../nodes/lightness";
import tetradRight from "../nodes/tetradRight";
import highlight from "../nodes/highlight";
import baseLight from "./baseLight";

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
          ...tailwindScaleLight.nodes,
          ...materialTonesLight.nodes,
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
              ...baseLight.nodes,
              {
                type: highlight.type,
                isHidden: true,
                token: "neutral",
                args: {
                  amount: 15,
                },
                children: [
                  ...materialTonesLight.nodes,
                  ...tailwindScaleLight.nodes,
                ],
              },
            ],
          },
          {
            type: tetradLeft.type,
            token: "secondary",
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
          {
            type: tetradRight.type,
            token: "accent",
            isHidden: false,
            children: [
              ...materialTonesLight.nodes,
              ...tailwindScaleLight.nodes,
            ],
          },
        ],
      },
    ],
  } as Preset);
