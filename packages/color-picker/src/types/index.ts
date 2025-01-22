import type { SchemistColor } from '@palettebro/theme-generator/types';
import type { FC } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
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
  ColorPickerProps,
  StringBasedPickerProps,
  SchemistBasedPickerProps,
  StringPickerComponent,
  SchemistPickerComponent,
};
