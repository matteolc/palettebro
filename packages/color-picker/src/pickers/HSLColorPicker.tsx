import {
  continuousGradient,
  hslToSchemist,
  range,
  schemistToHsl,
} from '@palettebro/theme-generator';
import React, { useMemo } from 'react';
import { BaseColorPicker } from '~/components';
import type { SchemistBasedPickerProps } from '~/types';

const HSLColorPicker: React.FC<SchemistBasedPickerProps> = ({
  value,
  onChange,
}) => {
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
      label: 'Saturation',
      value: s,
      setValue: setS,
      max: 100,
      gradient: gradients.s,
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
      onColorChange={([h, s, l]) => hslToSchemist({ h, s, l })}
    />
  );
};

export { HSLColorPicker };
