import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  darkMode: 'class',
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require('@repo/tailwind-theme')({
      themes: true,
      utils: true,
      darkTheme: 'dark',
    })
  ],
}

export default config;