import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./.storybook/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
    "!../../packages/**/node_modules",
  ],
  presets: [require("@repo/tailwind-config")],
};

export default config;
