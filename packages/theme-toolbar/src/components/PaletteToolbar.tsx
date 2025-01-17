import {
  RiHeartLine,
  RiMagicLine,
  RiMoonLine,
  RiSunLine,
} from '@remixicon/react';
import { ThemeVariantEnum } from '@repo/theme-generator/types';
import { formatSchemistToHex, randomUsableColor } from '@repo/theme-generator';
import { useContext, useEffect, useState } from 'react';
import { type BaseColors, PaletteContext } from './PaletteContext';
import { PaletteToolbarContext } from './PaletteToolbarContext';
import { PaletteSettings } from './PaletteSettings';
import { PaletteSwatches } from './PaletteSwatches';

const BASE_TOKENS = ['primary', 'secondary', 'accent', 'neutral'];
const STATUS_TOKENS = ['info', 'success', 'warning', 'error'];

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  fetcherKey?: string;
  navigate?: boolean;
}

interface FetcherResult<T> {
  state: 'idle' | 'submitting' | 'loading';
  data?: T;
}

interface PaletteToolbarProps {
  FormComponent: React.ComponentType<FormProps>;
  useFetcher: <T>({ key }: { key: string }) => FetcherResult<T>;
  generateEndpoint?: string;
  favouritesEndpoint?: string;
}

interface GenerateActionResponse {
  results: {
    palette: string[];
  }[];
}

const PaletteToolbar = ({
  FormComponent,
  useFetcher,
  generateEndpoint = '/generate',
  favouritesEndpoint = '/favourites',
}: PaletteToolbarProps) => {
  const { setIsDark, isDark, setBaseColors, variant, palette } =
    useContext(PaletteContext);
  const { temperature, profile, preset, adjacency, page, numColors } =
    useContext(PaletteToolbarContext);
  const [generatedPalettes, setGeneratedPalettes] = useState<
    { palette: string[] }[] | undefined
  >([]);
  const generateFetcher = useFetcher<GenerateActionResponse>({
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

    const palette = result.palette;
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

  const handleRandomize = () =>
    setBaseColors?.({
      primary: formatSchemistToHex(randomUsableColor()),
    } as BaseColors);

  const shouldSubmit = generatedPalettes?.length === 0;

  return (
    <div className="fixed bottom-0 left-0 md:mb-4 right-0 flex justify-center z-50">
      <div className="items-center gap-2 rounded-lg px-2 py-1 hidden lg:flex bg-white backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-center text-zinc-900">
          <FormComponent
            noValidate
            fetcherKey="generate"
            navigate={false}
            action={generateEndpoint}
            method="POST"
          >
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

            {variant === ThemeVariantEnum.dynamic ? (
              <button
                className="px-1 py-2"
                type={shouldSubmit ? 'submit' : 'button'}
                onClick={popPalette}
              >
                <RiMagicLine
                  className={
                    variant !== ThemeVariantEnum.dynamic ? 'text-gray-400' : ''
                  }
                />
              </button>
            ) : (
              <button
                className="px-1 py-2"
                type="button"
                onClick={handleRandomize}
              >
                <RiMagicLine />
              </button>
            )}
          </FormComponent>
          <PaletteSettings />
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
            <input
              type="text"
              readOnly
              className="hidden"
              value={palette?.neutral.color}
              name="neutral"
            />
            <button type="submit" className="pl-1 pr-2.5 py-2">
              <RiHeartLine />
            </button>
          </FormComponent>

          <PaletteSwatches
            onLockUnlock={resetGeneratedPalettes}
            isLoading={isGeneratorLoading}
          />

          <button
            type="button"
            className="pl-1 pr-2.5 py-2"
            onClick={() => setIsDark?.(!isDark)}
          >
            {isDark ? <RiMoonLine /> : <RiSunLine />}
          </button>
        </div>
      </div>
    </div>
  );
};

export { PaletteToolbar, BASE_TOKENS, STATUS_TOKENS };
