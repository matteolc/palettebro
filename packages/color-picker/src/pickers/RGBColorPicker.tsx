import {
  continuousGradient,
  range,
  rgbToSchemist,
  schemistToRgb,
} from '@repo/theme-generator';
import { type FC, useMemo, useState } from 'react';
import { BaseColorPicker } from '~/components';
import type { SchemistBasedPickerProps } from '~/types';

const RGBColorPicker: FC<SchemistBasedPickerProps> = ({ value, onChange }) => {
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

  const sliderConfig = [
    {
      label: 'Red',
      value: r,
      setValue: setR,
      gradient: gradients.r,
      max: 255,
      unit: '',
    },
    {
      label: 'Green',
      value: g,
      setValue: setG,
      gradient: gradients.g,
      max: 255,
      unit: '',
    },
    {
      label: 'Blue',
      value: b,
      setValue: setB,
      gradient: gradients.b,
      max: 255,
      unit: '',
    },
  ];

  return (
    <BaseColorPicker
      type="schemist"
      value={value}
      onChange={onChange}
      sliderConfig={sliderConfig}
      onColorChange={([r, g, b]) => rgbToSchemist({ r, g, b })}
    />
  );
};

export { RGBColorPicker };
