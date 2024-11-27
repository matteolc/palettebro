import pc from "picocolors";
import plugin from "tailwindcss/plugin";

import { version } from "../package.json";
import { themeColors } from "./theming/theme-colors";
import { injectThemes } from "./theming/inject-themes";
import { themes } from "./themes";
import { utilities } from "./utilities";

type PluginOptions = {
  themes: boolean | string[];
  utils: boolean;
  darkTheme: string | boolean;
};

export default plugin.withOptions(
  (options: PluginOptions) =>
    ({
      addBase,
      addUtilities,
    }: {
      // biome-ignore lint/suspicious/noExplicitAny: TODO: fix this
      addBase: (...args: any[]) => void;
      // biome-ignore lint/suspicious/noExplicitAny: TODO: fix this
      addUtilities: (...args: any[]) => void;
    }) => {
      console.log(
        "\n",
        `🏄   ${pc.magenta("@repo/tailwind-theme")} ${pc.dim(version)}`
      );

      if (options.utils) {
        addUtilities(utilities);
        console.log(`├─ ${pc.green("✔︎")} ${"Utility classes added"}`, "\n");
      }

      injectThemes(addBase, options, themes);
    },
  () => ({
    theme: {
      extend: {
        colors: {
          ...themeColors,
        },
      },
    },
  })
);

export { themes as defaultThemes };
export type { PluginOptions };
