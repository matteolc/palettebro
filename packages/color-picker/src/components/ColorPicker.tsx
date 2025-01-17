import { formatSchemistToHex, parseColor } from '@palettebruh/theme-generator';
import type { FC } from 'react';
import { tabs } from '~/const';
import type { ColorPickerProps } from '~/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/tabs';

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange }) => {
  const [colorFormat, schemistColor] = parseColor(value);
  if (!schemistColor || !colorFormat) return null;

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
              <Component type="string" onChange={onChange} />
            ) : (
              <Component
                type="schemist"
                value={schemistColor}
                onChange={(color) => onChange(formatSchemistToHex(color))}
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
