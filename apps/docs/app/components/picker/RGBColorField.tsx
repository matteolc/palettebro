import {
  rgbToSchemist,
  schemistToRgb,
} from 'node_modules/@repo/theme-generator/src/color/conversion';
import type { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import { type FC, useEffect, useMemo, useState } from 'react';
import { debounce } from '~/lib/debounce';
import type { CSSColorPickerProps } from './ColorField';
import { Slider } from './ColorSlider';

const RGBColorField: FC<CSSColorPickerProps> = ({ value, onChange }) => {
  const color = schemistToRgb(value);
  const [r, setR] = useState(color.r);
  const [g, setG] = useState(color.g);
  const [b, setB] = useState(color.b);

  const gradients = useMemo(
    () => ({
      r: continuousGradient(
        range(8).map((i) => {
          const val = Math.min(255, Math.max(0, Math.floor(i * 32)));
          return rgbToSchemist({ ...color, r: val });
        }),
      ),
      g: continuousGradient(
        range(8).map((i) => {
          const val = Math.min(255, Math.max(0, Math.floor(i * 32)));
          return rgbToSchemist({ ...color, g: val });
        }),
      ),
      b: continuousGradient(
        range(8).map((i) => {
          const val = Math.min(255, Math.max(0, Math.floor(i * 32)));
          return rgbToSchemist({ ...color, b: val });
        }),
      ),
    }),
    [color],
  );

  // Debounce color updates
  const debouncedOnChange = useMemo(
    () =>
      debounce((newColor: SchemistColor) => {
        onChange(newColor);
      }, 16), // ~1 frame at 60fps
    [onChange],
  );

  useEffect(() => {
    debouncedOnChange(rgbToSchemist({ r, g, b }));
    return () => {
      debouncedOnChange.cancel();
    };
  }, [r, g, b]);

  return (
    <div className="flex flex-col gap-y-4 my-4">
      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Red</div>
          <div className="text-lg font-bold mb-2">{Math.floor(r)}</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.r,
          }}
          min={0.1}
          step={0.1}
          max={255}
          value={[r]}
          onValueChange={(value: number[]) => setR(value[0])}
        />
      </div>

      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Green</div>
          <div className="text-lg font-bold mb-2">{Math.floor(g)}</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.g,
          }}
          min={0.1}
          step={0.1}
          max={255}
          value={[g]}
          onValueChange={(value: number[]) => setG(value[0])}
        />
      </div>

      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2">Blue</div>
          <div className="text-lg font-bold mb-2">{Math.floor(b)}</div>
        </div>
        <Slider
          trackStyle={{
            background: gradients.b,
          }}
          min={0.1}
          step={0.1}
          max={255}
          value={[b]}
          onValueChange={(value: number[]) => setB(value[0])}
        />
      </div>
    </div>
  );
};

export { RGBColorField };
