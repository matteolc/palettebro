import { DEFAULT_GENERATIVE_MODE } from '@/const';
import { DEFAULT_GENERATIVE_PRESET } from '@/const';
import {
  DEFAULT_GENERATIVE_PAGE,
  DEFAULT_GENERATIVE_TEMPERATURE,
} from '@/const';
import { DEFAULT_GENERATIVE_NUM_COLORS } from '@/const';
import { ADJACENCY_MAP } from '@palettebro/theme-generator';
import type {
  GenerativeThemeMode,
  GenerativeThemePage,
  GenerativeThemePreset,
} from '@palettebro/theme-generator';
import { createContext, useEffect, useState } from 'react';

type GenerativePaletteContextType = {
  setProfile?: (profile: GenerativeThemeMode) => void;
  setTemperature?: (temperature: number) => void;
  setPreset?: (preset: GenerativeThemePreset) => void;
  setPage?: (page: GenerativeThemePage) => void;
  setAdjacency?: (adjacency: string[]) => void;
  adjacency: string[];
  profile: GenerativeThemeMode;
  page: GenerativeThemePage;
  temperature: number;
  preset: GenerativeThemePreset;
  numColors: 3;
};

export const GenerativePaletteContext =
  createContext<GenerativePaletteContextType>({
    adjacency:
      ADJACENCY_MAP[DEFAULT_GENERATIVE_NUM_COLORS][DEFAULT_GENERATIVE_PAGE][
        DEFAULT_GENERATIVE_PRESET
      ].map(String),
    profile: DEFAULT_GENERATIVE_MODE,
    page: DEFAULT_GENERATIVE_PAGE,
    temperature: DEFAULT_GENERATIVE_TEMPERATURE,
    preset: DEFAULT_GENERATIVE_PRESET,
    numColors: DEFAULT_GENERATIVE_NUM_COLORS,
  });

export const GenerativePaletteContextProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<GenerativeThemeMode>(
    DEFAULT_GENERATIVE_MODE,
  );
  const [temperature, setTemperature] = useState<number>(
    DEFAULT_GENERATIVE_TEMPERATURE,
  );
  const [preset, setPreset] = useState<GenerativeThemePreset>(
    DEFAULT_GENERATIVE_PRESET,
  );
  const [page, setPage] = useState<GenerativeThemePage>(
    DEFAULT_GENERATIVE_PAGE,
  );
  const [numColors, setNumColors] = useState<
    typeof DEFAULT_GENERATIVE_NUM_COLORS
  >(DEFAULT_GENERATIVE_NUM_COLORS);
  const [adjacency, setAdjacency] = useState<string[]>(
    ADJACENCY_MAP[numColors][page][preset].map(String),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setAdjacency(ADJACENCY_MAP[numColors][page][preset].map(String));
  }, [page, preset]);

  return (
    <GenerativePaletteContext.Provider
      value={{
        profile,
        setProfile,
        page,
        setPage,
        temperature,
        setTemperature,
        preset,
        setPreset,
        adjacency,
        setAdjacency,
        numColors,
      }}
    >
      <div>{children}</div>
    </GenerativePaletteContext.Provider>
  );
};
