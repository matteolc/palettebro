import { useEffect } from "react";
import { defaultThemes } from "@repo/tailwind-theme";
import { usePalette } from "@repo/theme-generator/palettes";
import { colorToRawOklchString } from "~/lib/oklch";
import type { ThemeColorScheme } from "@repo/theme-generator/types";
import { useHints } from "./use-hints";

const useCustomPalette = (colors: Record<string, string>, isDark?: boolean) => {
	const hints = useHints();
	const currentTheme = defaultThemes[hints.theme];
	const modifiedTheme = {
		...currentTheme,
		"color-scheme": isDark ? "dark" : ("light" as ThemeColorScheme),
		baseColors: {
			...currentTheme.baseColors,
			...colors,
		},
	};
	const modifiedPalette = usePalette(modifiedTheme);
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(modifiedPalette)) {
		Object.assign(result, {
			[`--${key}`]: colorToRawOklchString(value.color),
		});
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// console.dir(result, { depth: null });
		for (const [key, value] of Object.entries(result)) {
			document.documentElement.style.setProperty(key, value);
		}
	}, [modifiedPalette]);

	return {
		palette: modifiedPalette,
		result,
	};
};

export { useCustomPalette };
