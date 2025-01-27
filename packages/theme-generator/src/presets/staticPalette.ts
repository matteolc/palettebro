import splitComplementaryLeft from '../nodes/splitComplementaryLeft';
import splitComplementaryRight from '../nodes/splitComplementaryRight';
import tetradLeft from '../nodes/tetradLeft';
import tetradRight from '../nodes/tetradRight';
import triadLeft from '../nodes/triadLeft';
import triadRight from '../nodes/triadRight';
import {
  ColorShadesPresetEnum,
  StaticThemePresetEnum,
  type ThemePalette,
} from '../types';
import type { Preset } from './types';
import primary from '../nodes/primary';
import { randomUsableColor } from '../color';
import defs from '../nodes';
import shades from '../nodes/shades';

type NodeConfig = {
  secondary: {
    default: string;
    reverse: string;
  };
  accent: {
    default: string;
    reverse: string;
  };
};

const presetNodeMapping: Record<
  keyof typeof StaticThemePresetEnum,
  NodeConfig
> = {
  'split-complementary': {
    secondary: {
      default: splitComplementaryLeft.type,
      reverse: splitComplementaryRight.type,
    },
    accent: {
      default: splitComplementaryRight.type,
      reverse: splitComplementaryLeft.type,
    },
  },
  tetrad: {
    secondary: {
      default: tetradLeft.type,
      reverse: tetradRight.type,
    },
    accent: {
      default: tetradRight.type,
      reverse: tetradLeft.type,
    },
  },
  triad: {
    secondary: {
      default: triadLeft.type,
      reverse: triadRight.type,
    },
    accent: {
      default: triadRight.type,
      reverse: triadLeft.type,
    },
  },
} as const;

const isValidStaticPreset = (preset: string): preset is keyof typeof StaticThemePresetEnum => {
  return preset in presetNodeMapping;
};

export default (options?: ThemePalette) => {
  const getNodeDef = (type: keyof typeof defs, token: string) => ({
    ...defs[type],
    token,
    children: shades({
      isDark: options?.isDark ?? false,
      colorShadesPreset:
        options?.colorShadesPreset ?? ColorShadesPresetEnum.tailwind,
      reverseLightDarkShades: options?.reverseLightDarkShades ?? false,
    }),
  });

  const defaultPreset = StaticThemePresetEnum.triad;
  let currentPreset = options?.preset ?? defaultPreset;
  
  // Ensure we have a valid static preset
  if (!isValidStaticPreset(currentPreset)) {
    // If the preset is invalid, fall back to the default
    currentPreset = defaultPreset;
  }
  
  const direction = options?.reverse ? 'reverse' : 'default';

  return {
    label: 'Static palette',
    description: 'A static palette with fixed color combinations',
    nodes: [
      primary({
        isDark: options?.isDark ?? false,
        primaryColor: options?.primaryColor ?? randomUsableColor(),
        colorShadesPreset:
          options?.colorShadesPreset ?? ColorShadesPresetEnum.tailwind,
        reverseLightDarkShades: options?.reverseLightDarkShades ?? false,
        children: [
          getNodeDef(
            presetNodeMapping[currentPreset].secondary[direction],
            'secondary',
          ),
          getNodeDef(presetNodeMapping[currentPreset].accent[direction], 'accent'),
        ],
      }),
    ],
  } as Preset;
};
