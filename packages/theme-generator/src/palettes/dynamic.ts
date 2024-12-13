import dynamicPalette from "../presets/dynamicPalette";
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
    isDark: boolean;
    reverse: boolean;
    preset: "split-complementary" | "tetrad" | "triad";
}) => {
    const { primaryColor, secondaryColor, accentColor, isDark } = theme;

    const primaryNodes = dynamicPalette({ token: 'primary', isDark, primaryColor }).nodes;
    const presets = [
        ...presetSamplesWithKeyAndName(primaryNodes, primaryColor),
        ...presetSamplesWithKeyAndName(semanticPairs.nodes, primaryColor),
    ];

    if (secondaryColor) {
        const secondaryNodes = dynamicPalette({ token: "secondary", isDark, secondaryColor }).nodes;
        presets.push(...[
            ...presetSamplesWithKeyAndName(secondaryNodes, secondaryColor),
            ...presetSamplesWithKeyAndName(semanticPairs.nodes, secondaryColor),
        ]);
    }

    if (accentColor) {
        const accentNodes = dynamicPalette({ token: "accent", isDark, accentColor }).nodes
        presets.push(...[
            ...presetSamplesWithKeyAndName(accentNodes, accentColor),
            ...presetSamplesWithKeyAndName(semanticPairs.nodes, accentColor),
        ]);
    }

    return presetSampleWithKeyAndNameHash(presets);
};
