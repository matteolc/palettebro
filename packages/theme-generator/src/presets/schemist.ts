import type { Preset } from "./types";
import triadLeft from "../nodes/triadLeft";
import triadRight from "../nodes/triadRight";
import neutral from "./neutral";
import semanticPairs from "./semanticPairs";
import states from "./states";

export default {
  label: "Schemist theme",
  description: "",
  nodes: [
    {
      type: triadLeft.type,
      token: "secondary",
      children: states.nodes,
    },
    {
      type: triadRight.type,
      token: "tertiary",
      children: states.nodes,
    },
    ...semanticPairs.nodes,
    ...neutral.nodes,
  ],
} as Preset;
