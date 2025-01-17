import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@radix-ui/*",
    "@remixicon/react",
    "@palettebruh/color-picker",
    "@palettebruh/theme-generator"
  ]
}); 