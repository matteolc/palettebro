import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import informative from "../nodes/informative";
import positive from "../nodes/positive";
import warning from "../nodes/warning";
import tailwindScaleLight from "./tailwindScaleLight";
import tetradLeft from "../nodes/tetradLeft";
import tetradRight from "../nodes/tetradRight";
import highlight from "../nodes/highlight";
import baseLight from "./baseLight";
import tailwindScaleDark from "./tailwindScaleDark";
import triadRight from "../nodes/triadRight";
import triadLeft from "../nodes/triadLeft";
import splitComplementaryLeft from "../nodes/splitComplementaryLeft";
import splitComplementaryRight from "../nodes/splitComplementaryRight";
import staticTones from "./staticTones";
import lightness from "../nodes/lightness";
import color from "../nodes/color";
import { SchemistColor } from "../color/types";
import states from "./states";
import contrasting from "../nodes/contrasting";
import rainbow from "./rainbow";
import analogous from "../nodes/analogous";

export default (options?: { primaryColor?: SchemistColor, saturation?: number, lightness?: number, isDark: boolean, preset: 'split-complementary' | 'tetrad' | 'triad', reverse: boolean }) => {

  const lightNodes = [
    ...staticTones.nodes,
    ...states.nodes,
    ...tailwindScaleLight.nodes,
  ];

  const darkNodes = [
    ...staticTones.nodes,
    ...states.nodes,
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
    description: "A static palette with a primary color",
    nodes: [    
      {
        type: color.type,
        isHidden: false,
        token: "primary",
        args: {
          color: options?.primaryColor,
        },
        children: [
          ...shadeNodes,   
          ...rainbow.nodes,        
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
