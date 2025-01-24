import {
  RiHeartLine,
  RiMagicLine,
  RiMoonLine,
  RiSunLine,
} from '@remixicon/react';
import {
  formatSchemistToHex,
  randomUsableColor,
  type SchemistColor,
} from '@palettebro/theme-generator';
import { ThemeVariantEnum } from '@palettebro/theme-generator/types';
import { useContext, useEffect, useState } from 'react';
import { type BaseColors, PaletteContext } from '@/context/PaletteContext';
import { PaletteSettings } from './settings/PaletteSettings';
import { GenerativePaletteContext } from '@/context/GenerativePaletteContext';
import type { FormProps } from '@/types';
import { PaletteToolbarColorSwatch } from './PaletteToolbarColorSwatch';
import { BASE_TOKENS } from '@/const';
import { Skeleton } from '@/ui/skeleton';
import { ColorShadesSettings } from './settings/ColorShadesSettings';
import { KobayashiPaletteContext } from '@/context';

const PaletteToolbar = ({
  FormComponent,
  useFetcher,
  generateEndpoint = '/generate',
  favouritesEndpoint = '/favourites',
}: {
  FormComponent: React.ComponentType<FormProps>;
  useFetcher: <T>({ key }: { key: string }) => {
    state: 'idle' | 'submitting' | 'loading';
    data?: T;
  };
  generateEndpoint?: string;
  favouritesEndpoint?: string;
}) => {
  const { setIsDark, isDark, setBaseColors, variant, palette } =
    useContext(PaletteContext);
  const { temperature, profile, preset, adjacency, page, numColors } =
    useContext(GenerativePaletteContext);
  const { word, image } = useContext(KobayashiPaletteContext);
  const [generatedPalettes, setGeneratedPalettes] = useState<
    { palette: string[] }[] | undefined
  >([]);
  const generateFetcher = useFetcher<{
    results: {
      palette: string[];
    }[];
  }>({
    key: 'generate',
  });

  const isGeneratorLoading = generateFetcher.state === 'submitting';

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (generateFetcher?.data?.results && generatedPalettes?.length === 0)
      setGeneratedPalettes(generateFetcher.data.results);
  }, [generateFetcher.data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const result = generatedPalettes?.[0];
    if (!result) return;

    const { palette } = result;
    console.dir({
      primary: palette[0],
      secondary: palette[1],
      accent: palette[2],
    }, { depth: null });
    setBaseColors?.({
      primary: palette[0],
      secondary: palette[1],
      accent: palette[2],
    });
  }, [generatedPalettes]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(
    () => setGeneratedPalettes([]),
    [temperature, profile, preset, page],
  );

  const popPalette = () => setGeneratedPalettes(generatedPalettes?.slice(1));

  const resetGeneratedPalettes = () => setGeneratedPalettes([]);

  const handleSetBaseColors = (color: SchemistColor) =>
    setBaseColors?.({
      primary: formatSchemistToHex(color),
    } as BaseColors);

  const shouldSubmit = generatedPalettes?.length === 0;

  return (
    <div className="fixed bottom-0 left-0 md:mb-4 right-0 flex justify-center z-50">
      <div className="items-center gap-2 rounded-lg px-2 py-1 hidden lg:flex bg-white backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-start gap-x-6">
          <div className="flex items-center justify-center text-zinc-900">
            {/* Generate */}
            <FormComponent
              noValidate
              fetcherKey="generate"
              navigate={false}
              action={generateEndpoint}
              method="POST"
            >
              <input type="hidden" name="mode" value={variant} />
              {variant === ThemeVariantEnum.kobayashi && (
                <>
                  <input type="hidden" name="image" value={image} />
                  <input type="hidden" name="word" value={word} />
                </>
              )}
              {variant === ThemeVariantEnum.dynamic && (
                <>
                  <input
                    type="text"
                    readOnly
                    className="hidden"
                    value={profile}
                    name="mode"
                  />
                  <input
                    type="text"
                    readOnly
                    className="hidden"
                    value={preset}
                    name="preset"
                  />
                  <input
                    type="text"
                    readOnly
                    className="hidden"
                    value={numColors}
                    name="colors"
                  />
                  <input
                    type="text"
                    readOnly
                    className="hidden"
                    value={temperature}
                    name="temperature"
                  />
                  <input
                    type="text"
                    readOnly
                    className="hidden"
                    value={adjacency}
                    name="adjacency"
                  />
                  <input
                    type="text"
                    readOnly
                    className="hidden"
                    value={page}
                    name="page"
                  />
                </>
              )}
              {(() => {
                switch (variant) {
                  case ThemeVariantEnum.dynamic:
                    return (
                      <button
                        className="px-1 py-2"
                        type={shouldSubmit ? 'submit' : 'button'}
                        onClick={popPalette}
                      >
                        <RiMagicLine />
                      </button>
                    );
                  case ThemeVariantEnum.kobayashi:
                    return (
                      <button
                        className="px-1 py-2"
                        type={shouldSubmit ? 'submit' : 'button'}
                        onClick={popPalette}
                      >
                        <RiMagicLine />
                      </button>
                    );
                  default:
                    return (
                      <button
                        className="px-1 py-2"
                        type="button"
                        onClick={() => handleSetBaseColors(randomUsableColor())}
                      >
                        <RiMagicLine />
                      </button>
                    );
                }
              })()}
            </FormComponent>
            {/* Settings */}
            <PaletteSettings />
            {/* Color shades settings */}
            <ColorShadesSettings />
            {/* Light/Dark mode toggle */}
            <button
              type="button"
              className="px-1 py-2"
              onClick={() => setIsDark?.(!isDark)}
            >
              {isDark ? <RiSunLine /> : <RiMoonLine />}
            </button>
            {/* Favourites */}
            <FormComponent
              noValidate
              fetcherKey="favourites"
              navigate={false}
              action={favouritesEndpoint}
              method="POST"
            >
              <input type="hidden" name="intent" value="ADD" />
              <input
                type="text"
                readOnly
                className="hidden"
                value={palette?.primary.color}
                name="primary"
              />
              <input
                type="text"
                readOnly
                className="hidden"
                value={palette?.secondary.color}
                name="secondary"
              />
              <input
                type="text"
                readOnly
                className="hidden"
                value={palette?.accent.color}
                name="accent"
              />
              <button type="submit" className="px-1 py-2">
                <RiHeartLine />
              </button>
            </FormComponent>
          </div>
          {/* Color swatches */}
          <div className="flex flex-row gap-1">
            {BASE_TOKENS.map((token) =>
              isGeneratorLoading ? (
                <Skeleton
                  key={token}
                  className="h-[52px] w-48 rounded-lg bg-zinc-200"
                />
              ) : (
                <PaletteToolbarColorSwatch
                  token={token}
                  key={token}
                  onLockUnlock={resetGeneratedPalettes}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PaletteToolbar };
