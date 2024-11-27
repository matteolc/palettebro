import contrasting from "../nodes/contrasting";
import type { Preset } from "./types";
import semantics from "./semantics";

export default {
  label: "Semantic color pairs",
  description: "",
  nodes: semantics.nodes.map((node) => ({
    ...node,
    children: [
      {
        type: contrasting.type,
        token: "on-$",
      },
    ],
  })),
} as Preset;
