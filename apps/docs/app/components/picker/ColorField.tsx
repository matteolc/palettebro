import { FC } from 'react';
import { RGBColorField } from './RGBColorField';
import { CSSColorField } from './CSSColorField';
import { HSLColorField } from './HSLColorField';
import { LCHColorField } from './LCHColorField';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { formatSchemistToHex } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { parseColor } from 'node_modules/@repo/theme-generator/src/color/parsing';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ColorPickerTailwind } from './ColorPickerTailwind';
import { PantoneColorField } from './PantoneColorField';
import { RALColorField } from './RALColorField';

interface ColorFieldProps {
    value: string;
    token: string;
    onChange: (value: string) => void;
}

interface CSSColorPickerProps {
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const ColorField: FC<ColorFieldProps> = ({
    value,
    token,
    onChange
}) => {
    const [colorFormat, schemistColor] = parseColor(value);
    if (!schemistColor) return null;
    if (!colorFormat) return null;

    const handleChange = (newValue: SchemistColor) => onChange(formatSchemistToHex(newValue));

    return (
        <div className="col-span-full h-[30.5rem]">
            <fieldset>
                <TabGroup>
                    <TabList className="flex flex-row gap-2 mb-2 text-lg text-zinc-950">
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">RGB</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">HSL</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">LCH</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">CSS</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Tailwind</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Pantone</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">RAL</Tab>
                    </TabList>
                    <TabPanels className="p-2">
                        <TabPanel>
                            <RGBColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabPanel>
                        <TabPanel>
                            <HSLColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabPanel>
                        <TabPanel>
                            <LCHColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabPanel>

                        <TabPanel>
                            <CSSColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ColorPickerTailwind token={token} />
                        </TabPanel>
                        <TabPanel>
                            <PantoneColorField
                                token={token}
                            />
                        </TabPanel>
                        <TabPanel>
                            <RALColorField
                                token={token}
                            />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </fieldset>
        </div>
    );
};

export default ColorField;
export type { CSSColorPickerProps };