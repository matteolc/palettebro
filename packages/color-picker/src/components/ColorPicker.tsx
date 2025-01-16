import { formatSchemistToHex } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { parseColor } from 'node_modules/@repo/theme-generator/src/color/parsing';
import type { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/tabs';
import type { ColorPickerProps } from '~/types';
import { tabs } from '~/const';

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange }) => {
  const [colorFormat, schemistColor] = parseColor(value);
  if (!schemistColor || !colorFormat) return null;

  const handleChange = (color: SchemistColor) =>
    onChange(formatSchemistToHex(color));

  const handleColorChange = (color: string) => {
    onChange(color);
  };

  return (
    <div className="h-[30.5rem]">
      <Tabs defaultValue="lch">
        <TabsList className="bg-zinc-100 text-zinc-950">
          {tabs.map(({ value }) => (
            <TabsTrigger
              key={value}
              className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50"
              value={value}
            >
              {value.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(({ value, type, component: Component }) => (
          <TabsContent key={value} value={value}>
            {type === 'string' ? (
              <Component type="string" onChange={handleColorChange} />
            ) : (
              <Component
                type="schemist"
                value={schemistColor}
                onChange={handleChange}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export { ColorPicker };
export type { ColorPickerProps };
