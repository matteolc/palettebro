import { useEffect } from "react";
import { defaultThemes } from "@repo/tailwind-theme";
import { usePalette } from "@repo/theme-generator/palettes";
import { colorToRawOklchString } from "~/lib/oklch";
import type {
	ThemeColorScheme,
	ThemeVariant,
} from "@repo/theme-generator/types";
import { useHints } from "./use-hints";

const useCustomPalette = (
	colors: Record<string, string>,
	isDark?: boolean,
	saturation?: number,
	variant?: ThemeVariant,
	lightness?: number,
) => {
	const hints = useHints();
	const currentTheme = defaultThemes[hints.theme];
	const modifiedTheme = {
		...currentTheme,
		"color-scheme": isDark ? "dark" : ("light" as ThemeColorScheme),
		saturation: saturation ?? currentTheme.saturation,
		variant: variant ?? currentTheme.variant,
		lightness: lightness ?? currentTheme.lightness,
		baseColors: {
			...currentTheme.baseColors,
			...colors,
		},
	};
	// console.dir(modifiedTheme, { depth: null });
	const modifiedPalette = usePalette(modifiedTheme);
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(modifiedPalette)) {
		Object.assign(result, {
			[`--${key}`]: colorToRawOklchString(value.color),
		});
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		for (const [key, value] of Object.entries(result)) {
			document.documentElement.style.setProperty(key, value);
		}
	}, [result]);

	return {
		palette: modifiedPalette,
		result,
	};
};

export { useCustomPalette };
