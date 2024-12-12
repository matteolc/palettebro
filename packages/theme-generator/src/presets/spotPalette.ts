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
import materialTonesDark from "./materialTonesDark";
import tailwindScaleDark from "./tailwindScaleDark";
import triadRight from "../nodes/triadRight";
import triadLeft from "../nodes/triadLeft";
import splitComplementaryLeft from "../nodes/splitComplementaryLeft";
import splitComplementaryRight from "../nodes/splitComplementaryRight";
import contrasting from "../nodes/contrasting";
import spotTonesLight from "./spotTonesLight";
import spotTonesDark from "./spotTonesDark";

export default (options?: { saturation?: number, lightness?: number, isDark: boolean, preset: 'split-complementary' | 'tetrad' | 'triad', reverse: boolean, contrast: number }) => {

  const lightNodes = [
    ...spotTonesLight.nodes,
    ...tailwindScaleLight.nodes,
  ];

  const darkNodes = [
    ...spotTonesDark.nodes,
    ...tailwindScaleDark.nodes,
  ];

  const shadeNodes = options?.isDark ? darkNodes : lightNodes;

  const secondaryNode = {
    token: "secondary",
    children: shadeNodes,
    type: '',
  }
  if (options?.preset === 'split-complementary') {
    secondaryNode["type"] = options?.reverse ? splitComplementaryRight.type : splitComplementaryLeft.type;
  } else if (options?.preset === 'tetrad') {
    secondaryNode["type"] = options?.reverse ? tetradRight.type : tetradLeft.type;
  } else {
    secondaryNode["type"] = options?.reverse ? triadRight.type : triadLeft.type;
  }

  const accentNode = {
    token: "accent",
    children: shadeNodes,
    type: '',
  }
  if (options?.preset === 'split-complementary') {
    accentNode["type"] = options?.reverse ? splitComplementaryLeft.type : splitComplementaryRight.type;
  } else if (options?.preset === 'tetrad') {
    accentNode["type"] = options?.reverse ? tetradLeft.type : tetradRight.type;
  } else {
    accentNode["type"] = options?.reverse ? triadLeft.type : triadRight.type;
  }

  return {
    label: "Spot palette",
    description: "A spot palette with a primary color",
    nodes: [
      {
        type: saturation.type,
        isHidden: false,
        token: "primary",
        args: {
          amount: options?.saturation ?? 100,
        },
            children: [
              ...shadeNodes,
              secondaryNode,
              accentNode,
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
                    isHidden: false,
                    token: "neutral",
                    args: {
                      amount: 5,
                    },
                    children: shadeNodes,
                  },
                ],
              },
              {
                type: negative.type,
                token: "error",
                isHidden: false,
                children: shadeNodes,
              },
              {
                type: informative.type,
                token: "info",
                isHidden: false,
                children: shadeNodes,
              },
              {
                type: positive.type,
                token: "success",
                isHidden: false,
                children: shadeNodes,
              },
              {
                type: warning.type,
                token: "warning",
                isHidden: false,
                children: shadeNodes,
              },
            ],   
      },
    ],
  } as Preset;
};
