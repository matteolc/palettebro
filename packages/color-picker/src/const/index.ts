import {
  HEXColorPicker,
  HSLColorPicker,
  LCHColorPicker,
  PantoneColorPicker,
  RALColorPicker,
  RGBColorPicker,
  TailwindColorPicker,
} from '~/pickers';
import {
  type ColorPickerPicker,
  ColorPickerPickerEnum,
  type ColorPickerType,
  ColorPickerTypeEnum,
  type SchemistPickerComponent,
  type StringPickerComponent,
} from '~/types';

const DEFAULT_PICKER = ColorPickerPickerEnum.HSL;

const PICKER_TABS = [
  {
    value: ColorPickerPickerEnum.RGB,
    type: ColorPickerTypeEnum.schemist,
    component: RGBColorPicker as SchemistPickerComponent,
  },
  {
    value: ColorPickerPickerEnum.HSL,
    type: ColorPickerTypeEnum.schemist,
    component: HSLColorPicker as SchemistPickerComponent,
  },
  {
    value: ColorPickerPickerEnum.LCH,
    type: ColorPickerTypeEnum.schemist,
    component: LCHColorPicker as SchemistPickerComponent,
  },
  {
    value: ColorPickerPickerEnum.HEX,
    type: ColorPickerTypeEnum.schemist,
    component: HEXColorPicker as SchemistPickerComponent,
  },
  {
    value: ColorPickerPickerEnum.TW,
    type: ColorPickerTypeEnum.string,
    component: TailwindColorPicker as StringPickerComponent,
  },
  {
    value: ColorPickerPickerEnum.PANTONE,
    type: ColorPickerTypeEnum.string,
    component: PantoneColorPicker as StringPickerComponent,
  },
  {
    value: ColorPickerPickerEnum.RAL,
    type: ColorPickerTypeEnum.string,
    component: RALColorPicker as StringPickerComponent,
  },
] satisfies {
  value: ColorPickerPicker;
  type: ColorPickerType;
  component: StringPickerComponent | SchemistPickerComponent;
}[];

export { PICKER_TABS, DEFAULT_PICKER };
