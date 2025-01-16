import { RiPaletteFill } from '@remixicon/react';
import { useContext } from 'react';
import { PaletteContext } from '~/PaletteContext';
import { sentenceCase } from '~/lib/string';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ColorPaletteShades } from './ColorPaletteShades';
import {
  wcag2Contrast,
  wcag2ContrastGrade,
  wcag3Contrast,
  wcag3ContrastGrade,
} from '@repo/theme-generator';
import { Badge } from '~/components/ui/badge';

const TokenColorPalette = ({ token }: { token: string }) => {
  const { palette } = useContext(PaletteContext);
  const name = palette?.[token]?.name;

  if (!name) return null;

  const Wcag2Contrast = ({ bg, fg }: { bg: string; fg: string }) => {
    return (
      <Badge variant="outline" className="text-inherit border-inherit border-opacity-40">WCAG2 {wcag2ContrastGrade(bg, fg)} ({wcag2Contrast(bg, fg).toFixed(1)})</Badge>
    );
  };

  const Wcag3Contrast = ({ bg, fg }: { bg: string; fg: string }) => {
    return (
      <Badge variant="outline" className="text-inherit border-inherit">WCAG3 {wcag3ContrastGrade(bg, fg)} ({wcag3Contrast(bg, fg).toFixed(1)})</Badge>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold flex items-center text-neutral-800">
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
                  <div>{palette?.[`${token}${shade}`].name}</div>

                  <div style={{
                    borderColor: `oklch(var(--${token}-text))`,
                  }} className='flex flex-col gap-y-1 mt-2' >
                    <Wcag2Contrast
                      bg={palette?.[`${token}${shade}`].color}
                      fg={palette?.[`${token}-text`].color}
                    />
                    <Wcag3Contrast
                      bg={palette?.[`${token}${shade}`].color}
                      fg={palette?.[`${token}-text`].color}
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
                <div>{palette?.[`${token}-container`].name}</div>
                <div style={{
                  borderColor: `oklch(var(--on-${token}-container))`,
                }} className='flex flex-col gap-y-1 mt-2' >
                  <Wcag2Contrast
                    bg={palette?.[`${token}-container`].color}
                    fg={palette?.[`on-${token}-container`].color}
                  />
                  <Wcag3Contrast
                    bg={palette?.[`${token}-container`].color}
                    fg={palette?.[`on-${token}-container`].color}
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
                <div>{palette?.[`on-${token}-container`].name}</div>

                <div style={{
                  borderColor: `oklch(var(--${token}-container))`,
                }} className='flex flex-col gap-y-1 mt-2' >
                  <Wcag2Contrast
                    bg={palette?.[`${token}-container`].color}
                    fg={palette?.[`on-${token}-container`].color}
                  />
                  <Wcag3Contrast
                    bg={palette?.[`${token}-container`].color}
                    fg={palette?.[`on-${token}-container`].color}
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

export { TokenColorPalette };
