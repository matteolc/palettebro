import complementary from "../nodes/complementary";
import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialNeutralDark from "./materialNeutralDark";
import materialTonesDark from "./materialTonesDark";

export default {
  label: "Material dark",
  description: "Variations inspired by Material You for dark themes",
  nodes: [
    {
      type: saturation.type,
      token: "primary",
      isHidden: true,
      args: {
        amount: 40,
      },
      children: [
        ...materialTonesDark.nodes,
        {
          type: complementary.type,
          token: "complementary",
          isHidden: true,
          children: materialTonesDark.nodes,
        },
        {
          type: negative.type,
          token: "error",
          isHidden: true,
          children: materialTonesDark.nodes,
        },
        ...materialNeutralDark.nodes,
      ],
    },
  ],
} as Preset;
