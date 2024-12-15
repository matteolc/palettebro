import { useEffect } from "react";
import { usePalette } from "@repo/theme-generator/palettes";
import { colorToRawOklchString } from "~/lib/oklch";
import type {
	StaticThemePreset,
	ThemeColorScheme,
	ThemeVariant,
} from "@repo/theme-generator/types";
import { useHints } from "./use-hints";
import twColors from "tailwindcss/colors";

const useCustomPalette = (
	colors: Record<string, string>,
	variant: ThemeVariant,
	isDark: boolean,
	preset: StaticThemePreset,
	reverse: boolean,
) => {
	const hints = useHints();
	const currentTheme = {
		light: {
			"color-scheme": "light" as const,
			baseColors: {
				primary: twColors.purple[500],
			},
		},
		dark: {
			"color-scheme": "dark" as const,
			baseColors: {
				primary: twColors.purple[500],
			},
		},
	}[hints.theme];
	const modifiedTheme = {
		...currentTheme,
		"color-scheme": isDark ? "dark" : ("light" as ThemeColorScheme),
		variant,
		preset,
		reverse,
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
