import {
  continuousGradient,
  lchToSchemist,
  range,
  schemistToLch,
} from '@palettebro/theme-generator';
import React, { useMemo } from 'react';
import { BaseColorPicker } from '~/components';
import type { SchemistBasedPickerProps } from '~/types';

const LCHColorPicker: React.FC<SchemistBasedPickerProps> = ({
  value,
  onChange,
}) => {
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

  const sliderConfig = [
    {
      label: 'Hue',
      value: h,
      setValue: setH,
      max: 360,
      gradient: gradients.h,
      unit: '',
    },
    {
      label: 'Chroma',
      value: c,
      setValue: setC,
      max: 100,
      gradient: gradients.c,
      unit: '%',
    },
    {
      label: 'Lightness',
      value: l,
      setValue: setL,
      max: 100,
      gradient: gradients.l,
      unit: '%',
    },
  ];

  return (
    <BaseColorPicker
      type="schemist"
      value={value}
      onChange={onChange}
      sliderConfig={sliderConfig}
      onColorChange={([h, c, l]) => lchToSchemist({ h, c, l })}
    />
  );
};

export { LCHColorPicker };
