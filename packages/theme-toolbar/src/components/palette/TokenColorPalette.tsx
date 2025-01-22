import { RiPaletteFill } from '@remixicon/react';
import {
  wcag2Contrast,
  wcag2ContrastGrade,
  wcag3Contrast,
  wcag3ContrastGrade,
} from '@palettebro/theme-generator';
import { useContext } from 'react';
import { sentenceCase } from '@/lib/string';
import { Badge } from '@/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ColorPaletteShades } from './ColorPaletteShades';
import { PaletteContext } from '@/context/PaletteContext';
import { getPaletteColor } from '@/utils/get-palette-color';

export const TokenColorPalette = ({ token }: { token: string }) => {
  const { palette } = useContext(PaletteContext);
  const name = palette?.[token]?.name;

  if (!name) return null;

  const Wcag2Contrast = ({ bg, fg }: { bg: string; fg: string }) => {
    return (
      <Badge className="text-inherit border-none">
        WCAG2 {wcag2ContrastGrade(bg, fg)} ({wcag2Contrast(bg, fg)?.toFixed(1)})
      </Badge>
    );
  };

  const Wcag3Contrast = ({ bg, fg }: { bg: string; fg: string }) => {
    return (
      <Badge className="text-inherit border-none">
        WCAG3 {wcag3ContrastGrade(bg, fg)} ({wcag3Contrast(bg, fg).toFixed(1)})
      </Badge>
    );
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold flex items-center">
            <RiPaletteFill
              className="mr-2"
              style={{ color: `oklch(var(--${token}))` }}
            />{' '}
            {sentenceCase(token)} Palette
          </h3>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 grid grid-cols-3 gap-2">
            {['-light', '', '-dark'].map((shade) => (
              <div
                key={shade}
                style={{
                  backgroundColor: `oklch(var(--${token}${shade}))`,
                  color: `oklch(var(--${token}-text))`,
                }}
                className="p-4 rounded justify-center items-center flex"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="text-xl font-bold">
                    {shade ? sentenceCase(shade.substring(1)) : 'Base'}
                  </div>
                  <div>
                    {getPaletteColor(`${token}${shade}`, palette, 'name')}
                  </div>

                  <div
                    style={{
                      borderColor: `oklch(var(--${token}-text))`,
                    }}
                    className="flex flex-col mt-2 justify-center items-center border rounded-md"
                  >
                    <Wcag2Contrast
                      bg={getPaletteColor(`${token}${shade}`, palette)}
                      fg={getPaletteColor(`${token}-text`, palette)}
                    />
                    <Wcag3Contrast
                      bg={getPaletteColor(`${token}${shade}`, palette)}
                      fg={getPaletteColor(`${token}-text`, palette)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1 grid grid-cols-1 gap-2">
            <div
              style={{
                backgroundColor: `oklch(var(--${token}-container))`,
                color: `oklch(var(--on-${token}-container))`,
              }}
              className={'p-4 rounded text-center items-center'}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="text-xl font-bold">Container</div>
                <div>{getPaletteColor(`${token}-container`, palette)}</div>
                <div
                  style={{
                    borderColor: `oklch(var(--on-${token}-container))`,
                  }}
                  className="flex flex-col mt-2 justify-center items-center border rounded-md"
                >
                  <Wcag2Contrast
                    bg={getPaletteColor(`${token}-container`, palette)}
                    fg={getPaletteColor(`on-${token}-container`, palette)}
                  />
                  <Wcag3Contrast
                    bg={getPaletteColor(`${token}-container`, palette)}
                    fg={getPaletteColor(`on-${token}-container`, palette)}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: `oklch(var(--on-${token}-container))`,
                color: `oklch(var(--${token}-container))`,
              }}
              className={'group p-4 rounded text-center items-center'}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="text-xl font-bold">On Container</div>
                <div>{getPaletteColor(`on-${token}-container`, palette)}</div>

                <div
                  style={{
                    borderColor: `oklch(var(--${token}-container))`,
                  }}
                  className="flex flex-col mt-2 justify-center items-center border rounded-md"
                >
                  <Wcag2Contrast
                    bg={getPaletteColor(`${token}-container`, palette)}
                    fg={getPaletteColor(`on-${token}-container`, palette)}
                  />
                  <Wcag3Contrast
                    bg={getPaletteColor(`${token}-container`, palette)}
                    fg={getPaletteColor(`on-${token}-container`, palette)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ColorPaletteShades colors={[token]} />
      </CardContent>
    </Card>
  );
};
