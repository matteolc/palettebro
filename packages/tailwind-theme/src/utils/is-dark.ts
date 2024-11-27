import { wcagContrast } from "culori";

const isDark = (color: string) => (wcagContrast(color, "black") < wcagContrast(color, "white"))

export { isDark };