import { createContext, useEffect, useState } from 'react';
import type { KobayashiImage } from '@palettebro/theme-generator';
import { KobayashiImageEnum } from '@palettebro/theme-generator';
import {
  KOBAYASHI_COLOR_COMBINATIONS_MAP,
  KOBAYASHI_LIFESTYLE_KEYWORDS,
} from '@palettebro/theme-generator';

type KobayashiPaletteContextType = {
  word: string;
  words: string[];
  setWord: (word: string) => void;
  image: KobayashiImage;
  setImage: (image: KobayashiImage) => void;
  generative: boolean;
  setGenerative: (generative: boolean) => void;
};

export const KobayashiPaletteContext =
  createContext<KobayashiPaletteContextType>({
    word: 'pretty',
    words: KOBAYASHI_LIFESTYLE_KEYWORDS[KobayashiImageEnum.pretty],
    setWord: () => {},
    image: KobayashiImageEnum.pretty,
    setImage: () => {},
    generative: false,
    setGenerative: () => {},
  });

export const KobayashiPaletteContextProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [image, setImage] = useState<KobayashiImage>(KobayashiImageEnum.pretty);
  const [word, setWord] = useState(
    KOBAYASHI_LIFESTYLE_KEYWORDS[KobayashiImageEnum.pretty][0],
  );
  const words = Object.keys(
    KOBAYASHI_COLOR_COMBINATIONS_MAP[image] as Record<string, string[][]>,
  );
  const [generative, setGenerative] = useState(true);
  useEffect(() => {
    setWord(
      Object.keys(
        KOBAYASHI_COLOR_COMBINATIONS_MAP[image] as Record<string, string[][]>,
      )[0],
    );
  }, [image]);

  return (
    <KobayashiPaletteContext.Provider
      value={{
        word,
        words,
        setWord,
        image,
        setImage,
        generative,
        setGenerative,
      }}
    >
      {children}
    </KobayashiPaletteContext.Provider>
  );
};
