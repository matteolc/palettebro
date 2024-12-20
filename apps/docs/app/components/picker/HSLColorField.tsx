import {
  hslToSchemist,
  schemistToHsl,
} from 'node_modules/@repo/theme-generator/src/color/conversion';
import type { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import React, { useEffect, useMemo } from 'react';
import { debounce } from '~/lib/debounce';
import type { CSSColorPickerProps } from './ColorField';
import { Slider } from './ColorSlider';

const HSLColorField: React.FC<CSSColorPickerProps> = ({ value, onChange }) => {
  const color = schemistToHsl(value);
  const [h, setH] = React.useState(color.h);
  const [s, setS] = React.useState(color.s);
  const [l, setL] = React.useState(color.l);

  const gradients = useMemo(
    () => ({
      h: continuousGradient(
        range(12).map((i) => {
          const val = Math.min(360, Math.max(0, i * 30));
          return hslToSchemist({ ...color, h: val });
        }),
      ),
      s: continuousGradient(
        range(10).map((i) => {
          const val = Math.min(100, Math.max(0, i * 10));
          return hslToSchemist({ ...color, s: val });
        }),
      ),
      l: continuousGradient(
        range(10).map((i) => {
          const val = Math.min(100, Math.max(0, i * 10));
          return hslToSchemist({ ...color, l: val });
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

  useEffect(() => {
    debouncedOnChange(hslToSchemist({ h, s, l }));
    return () => {
      debouncedOnChange.cancel();
    };
  }, [h, s, l]);

  return (
    <div className="flex flex-col gap-y-4 my-4">
      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Hue</div>
          <div className="text-lg font-bold mb-2">{Math.floor(h)}</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.h,
          }}
          max={360}
          value={[h]}
          onValueChange={(value: number[]) => setH(value[0])}
        />
      </div>

      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Saturation</div>
          <div className="text-lg font-bold mb-2">{Math.floor(s)}%</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.s,
          }}
          max={100}
          value={[s]}
          onValueChange={(value: number[]) => setS(value[0])}
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

export { HSLColorField };
