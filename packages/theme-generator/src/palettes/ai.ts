import aiPaletteLightOther from "../presets/aiPaletteLightOther";
import aiPaletteLightPrimary from "../presets/aiPaletteLightPrimary";
import aiPaletteDarkOther from "../presets/aiPaletteDarkOther";
import aiPaletteDarkPrimary from "../presets/aiPaletteDarkPrimary";
import semanticPairs from "../presets/semanticPairs";
import {
    presetSamplesWithKeyAndName,
    presetSampleWithKeyAndNameHash,
} from "../index";
import type { SchemistColor } from "../color/types";

export default (theme: {
    primaryColor: SchemistColor;
    secondaryColor?: SchemistColor;
    accentColor?: SchemistColor;
    saturation: number;
    isDark: boolean;
    reverse: boolean;
    preset: "split-complementary" | "tetrad" | "triad";
}) => {
    const { primaryColor, secondaryColor, accentColor, saturation, isDark } = theme;

    const primaryNodes = isDark
        ? aiPaletteDarkPrimary({ saturation }).nodes
        : aiPaletteLightPrimary({ saturation }).nodes;


        const presets = [
            ...presetSamplesWithKeyAndName(primaryNodes, primaryColor),
            ...presetSamplesWithKeyAndName(semanticPairs.nodes, primaryColor),
        ];

    if (secondaryColor) {

        const secondaryNodes = isDark
            ? aiPaletteDarkOther({ saturation, token: "secondary" }).nodes
            : aiPaletteLightOther({ saturation, token: "secondary" }).nodes;

        const secondaryPresets = [
            ...presetSamplesWithKeyAndName(secondaryNodes, secondaryColor),
            ...presetSamplesWithKeyAndName(semanticPairs.nodes, secondaryColor),
        ];

        presets.push(...secondaryPresets);
    }

    if (accentColor) {

        const accentNodes = isDark
            ? aiPaletteDarkOther({ saturation, token: "accent" }).nodes
            : aiPaletteLightOther({ saturation, token: "accent" }).nodes;

        const accentPresets = [
            ...presetSamplesWithKeyAndName(accentNodes, accentColor),
            ...presetSamplesWithKeyAndName(semanticPairs.nodes, accentColor),
        ];

        presets.push(...accentPresets);
    }

    return presetSampleWithKeyAndNameHash(presets);
};
