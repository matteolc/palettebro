import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content" | "plugins"> = {
	content: [
		"./app/**/*.tsx",
		"../../packages/**/*.{js,ts,jsx,tsx}",
		"!../../packages/**/node_modules",
	],
	plugins: [require("@headlessui/tailwindcss")],
};

export default config;
