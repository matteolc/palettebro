import highlight from "../nodes/highlight";
import shadow from "../nodes/shadow";
import type { Preset } from "./types";

export default {
  label: "States",
  description: "Highlight and shadow",
  nodes: [
    {
      type: highlight.type,
      token: "$-light",
    },
    {
      type: shadow.type,
      token: "$-dark",
    },
  ],
} as Preset;
