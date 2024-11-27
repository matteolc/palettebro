import { interpolate } from "culori";
import { oklchColorToString } from "./oklch";

const interpolateBlackWhite = (
  input: string,
  percentage = 0.1,
  tint: "white" | "black" = "white"
) => {
  try {
    const result = interpolate([input, tint], "oklch")(percentage);
    return oklchColorToString(result);
  } catch (e) {
    return "0% 0 0";
  }
};

export { interpolateBlackWhite };
