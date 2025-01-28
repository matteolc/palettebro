import { formatSchemistToHex, parseColor } from '@palettebro/theme-generator';
import type { FC } from 'react';
import { PICKER_TABS, DEFAULT_PICKER } from '~/const';
import type { ColorPickerProps, ColorPickerPicker } from '~/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/tabs';

const getPickerLabel = (value: ColorPickerPicker) => {
  switch (value) {
    case 'rgb':
      return 'RGB';
    case 'hsl':
      return 'HSL';
    case 'lch':
      return 'LCH';
    case 'hex':
      return 'Hex';
    case 'tw':
      return 'Tailwind';
    case 'pantone':
      return 'Pantone®';
    case 'ral':
      return 'RAL';
  }
};

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange, pickers }) => {
  const [colorFormat, schemistColor] = parseColor(value);
  if (!schemistColor || !colorFormat) return null;

  const isPickerEnabled = (pickerValue: ColorPickerPicker) => {
    if (!pickers || pickers.length === 0) return true;
    return pickers.includes(pickerValue);
  };

  const defaultValue = isPickerEnabled(DEFAULT_PICKER)
    ? DEFAULT_PICKER
    : PICKER_TABS.find(({ value }) => isPickerEnabled(value))?.value ?? DEFAULT_PICKER;

  return (
    <div className="h-[30.5rem]">
      <Tabs defaultValue={defaultValue}>
        <TabsList className="bg-zinc-100 text-zinc-950">
          {PICKER_TABS.map(({ value }) => (
            <TabsTrigger
              key={value}
              className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              value={value}
              disabled={!isPickerEnabled(value)}
            >
              {getPickerLabel(value)}
            </TabsTrigger>
          ))}
        </TabsList>

        {PICKER_TABS.map(({ value, type, component: Component }) => (
          <TabsContent key={value} value={value}>
            {isPickerEnabled(value) &&
              (type === 'string' ? (
                <Component type="string" onChange={onChange} />
              ) : (
                <Component
                  type="schemist"
                  value={schemistColor}
                  onChange={(color) => onChange(formatSchemistToHex(color))}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export { ColorPicker };
export type { ColorPickerProps };
