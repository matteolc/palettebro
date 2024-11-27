import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content" | "prefix"> = {
  content: [
    "./app/**/*.tsx",
    "./app/**/*.mdx",
    "../../packages/**/*.{js,ts,jsx,tsx}",
    "!../../packages/**/node_modules",
  ],
  presets: [require("@repo/tailwind-config")],
};

export default config;
