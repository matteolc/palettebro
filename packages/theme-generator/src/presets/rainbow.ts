import analogous from "../nodes/analogous";
import type { Preset } from "./types";
import { range } from "../utils/generators";

export default {
  label: "Rainbow",
  description: "Every analogous colors",
  nodes: range(11).map((steps) => ({
    type: analogous.type,
    token: `$-rainbow-${steps}`,
    args: {
      steps: steps + 1,
    },
  })),
} as Preset;
