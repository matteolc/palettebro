import {
  lchToSchemist,
  schemistToLch,
} from 'node_modules/@repo/theme-generator/src/color/conversion';
import type { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import React, { useEffect, useMemo } from 'react';
import { debounce } from '~/lib/debounce';
import type { CSSColorPickerProps } from './ColorField';
import { Slider } from './ColorSlider';

const LCHColorField: React.FC<CSSColorPickerProps> = ({ value, onChange }) => {
  const color = schemistToLch(value);
  const [h, setH] = React.useState(color.h);
  const [c, setC] = React.useState(color.c);
  const [l, setL] = React.useState(color.l);

  const gradients = useMemo(
    () => ({
      h: continuousGradient(
        range(12).map((i) => {
          const val = Math.min(360, Math.max(0, i * 30));
          return lchToSchemist({ ...color, h: val });
        }),
      ),
      c: continuousGradient(
        range(10).map((i) => {
          const val = Math.min(100, Math.max(0, i * 10));
          return lchToSchemist({ ...color, c: val });
        }),
      ),
      l: continuousGradient(
        range(10).map((i) => {
          const val = Math.min(100, Math.max(0, i * 10));
          return lchToSchemist({ ...color, l: val });
        }),
      ),
    }),
    [color],
  );

  const debouncedOnChange = useMemo(
    () =>
      debounce((newColor: SchemistColor) => {
        onChange(newColor);
      }, 16),
    [onChange],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    debouncedOnChange(lchToSchemist({ h, c, l }));
    return () => {
      debouncedOnChange.cancel();
    };
  }, [h, c, l]);

  return (
    <div className="flex flex-col gap-y-4 my-4">
      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Hue</div>
          <div className="text-lg font-bold mb-2">{Math.floor(h)}</div>
        </div>
        <Slider
          trackStyle={{ background: gradients.h }}
          max={360}
          value={[h]}
          onValueChange={(value: number[]) => setH(value[0])}
        />
      </div>

      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Chroma</div>
          <div className="text-lg font-bold mb-2">{Math.floor(c)}%</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.c,
          }}
          max={100}
          value={[c]}
          onValueChange={(value: number[]) => setC(value[0])}
        />
      </div>

      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Lightness</div>
          <div className="text-lg font-bold mb-2">{Math.floor(l)}%</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.l,
          }}
          max={100}
          value={[l]}
          onValueChange={(value: number[]) => setL(value[0])}
        />
      </div>
    </div>
  );
};

export { LCHColorField };
