import complementary from "../nodes/complementary";
import negative from "../nodes/negative";
import saturation from "../nodes/saturation";
import type { Preset } from "./types";
import materialNeutralLight from "./materialNeutralLight";
import materialTonesLight from "./materialTonesLight";

export default {
  label: "Material light",
  description: "Variations inspired by Material You for light themes",
  nodes: [
    {
      type: saturation.type,
      token: "primary",
      isHidden: true,
      args: {
        amount: 40,
      },
      children: [
        ...materialTonesLight.nodes,
        {
          type: complementary.type,
          token: "complementary",
          isHidden: true,
          children: materialTonesLight.nodes,
        },
        {
          type: negative.type,
          token: "error",
          isHidden: true,
          children: materialTonesLight.nodes,
        },
        ...materialNeutralLight.nodes,
      ],
    },
  ],
} as Preset;
