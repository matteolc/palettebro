import { useCallback, useEffect } from "react";
import { usePalette } from "@repo/theme-generator/palettes";
import { colorToRawOklchString } from "~/lib/oklch";
import type {
	StaticThemePreset,
	ThemeColorScheme,
	ThemeVariant,
} from "@repo/theme-generator/types";
import { useHints } from "./use-hints";
import twColors from "tailwindcss/colors";

const useSetCssVars = () => {
	return useCallback((cssVars: Record<string, string>) => {
	  for (const [key, value] of Object.entries(cssVars)) {
		document.documentElement.style.setProperty(key, value);
		for (const iframe of document.querySelectorAll("iframe")) {
		  iframe.contentDocument?.documentElement.style.setProperty(key, value);
		}
	  }
	}, []); // Empty deps since it doesn't depend on any external values
  };
  
const useCustomPalette = (
	colors: Record<string, string>,
	variant: ThemeVariant,
	isDark: boolean,
	preset: StaticThemePreset,
	reverse: boolean,
) => {
	const hints = useHints();
	const setCssVars = useSetCssVars();
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
		debug: false,
		variant,
		preset,
		reverse,
		baseColors: {
			...currentTheme.baseColors,
			...colors,
		},
	};
	const modifiedPalette = usePalette(modifiedTheme);
	const cssVars: Record<string, string> = {};
	for (const [key, value] of Object.entries(modifiedPalette)) {
		Object.assign(cssVars, {
			[`--${key}`]: colorToRawOklchString(value.color),
		});
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCssVars(cssVars);
	}, [cssVars]);

	return {
		palette: modifiedPalette,
	};
};

export { useCustomPalette };
