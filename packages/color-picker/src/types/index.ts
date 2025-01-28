import type { SchemistColor } from '@palettebro/theme-generator/types';
import type { FC } from 'react';

type ColorPickerPicker =
  (typeof ColorPickerPickerEnum)[keyof typeof ColorPickerPickerEnum];
type ColorPickerType =
  (typeof ColorPickerTypeEnum)[keyof typeof ColorPickerTypeEnum];

const ColorPickerTypeEnum = {
  string: 'string',
  schemist: 'schemist',
} as const;

const ColorPickerPickerEnum = {
  RGB: 'rgb',
  HSL: 'hsl',
  LCH: 'lch',
  HEX: 'hex',
  TW: 'tw',
  PANTONE: 'pantone',
  RAL: 'ral',
} as const;

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  pickers?: ColorPickerPicker[];
}

interface StringBasedPickerProps {
  type: 'string';
  onChange: (value: string) => void;
}

interface SchemistBasedPickerProps {
  type: 'schemist';
  value: SchemistColor;
  onChange: (value: SchemistColor) => void;
}

type StringPickerComponent = FC<StringBasedPickerProps>;
type SchemistPickerComponent = FC<SchemistBasedPickerProps>;

export type {
  ColorPickerType,
  ColorPickerPicker,
  ColorPickerProps,
  StringBasedPickerProps,
  SchemistBasedPickerProps,
  StringPickerComponent,
  SchemistPickerComponent,
};

export { ColorPickerPickerEnum, ColorPickerTypeEnum };
