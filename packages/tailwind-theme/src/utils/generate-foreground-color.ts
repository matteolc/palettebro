import { interpolateBlackWhite } from "./interpolate-black-white";
import { isDark } from "./is-dark";

const generateForegroundColor = (color: string, percentage = 0.8) => interpolateBlackWhite(color, percentage, isDark(color) ? "white" : "black");

export { generateForegroundColor };
