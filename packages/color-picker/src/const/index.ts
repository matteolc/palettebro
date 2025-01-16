import {
  CSSColorPicker,
  HSLColorPicker,
  LCHColorPicker,
  PantoneColorPicker,
  RALColorPicker,
  RGBColorPicker,
  TailwindColorPicker,
} from '~/pickers';
import type { SchemistPickerComponent, StringPickerComponent } from '~/types';

const tabs = [
  {
    value: 'rgb',
    type: 'schemist' as const,
    component: RGBColorPicker as SchemistPickerComponent,
  },
  {
    value: 'hsl',
    type: 'schemist' as const,
    component: HSLColorPicker as SchemistPickerComponent,
  },
  {
    value: 'lch',
    type: 'schemist' as const,
    component: LCHColorPicker as SchemistPickerComponent,
  },
  {
    value: 'css',
    type: 'schemist' as const,
    component: CSSColorPicker as SchemistPickerComponent,
  },
  {
    value: 'tw',
    type: 'string' as const,
    component: TailwindColorPicker as StringPickerComponent,
  },
  {
    value: 'pantone',
    type: 'string' as const,
    component: PantoneColorPicker as StringPickerComponent,
  },
  {
    value: 'ral',
    type: 'string' as const,
    component: RALColorPicker as StringPickerComponent,
  },
] satisfies {
  value: string;
  type: 'string' | 'schemist';
  component: StringPickerComponent | SchemistPickerComponent;
}[];

export { tabs };
