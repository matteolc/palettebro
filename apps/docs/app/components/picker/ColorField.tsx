import React, { useState, useEffect } from 'react';
import { RGBColorField } from './RGBColorField';
import { CSSColorField } from './CSSColorField';
import { HSLColorField } from './HSLColorField';
import { LCHColorField } from './LCHColorField';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { ColorFormat, formatSchemistToHex } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { parseColor } from 'node_modules/@repo/theme-generator/src/color/parsing';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ColorPickerTailwind } from './ColorPickerTailwind';

interface ColorFieldProps {
    value: string;
    token: string;
    onChange: (value: string) => void;
}

const ColorField: React.FC<ColorFieldProps> = ({
    value,
    token,
    onChange
}) => {
    const [colorFormat, schemistColor] = parseColor(value);
    if (!schemistColor) return null;
    if (!colorFormat) return null;

    const [colorInputFormat, setColorInputFormat] = useState<ColorFormat>(colorFormat);

    const [localValue, setLocalValue] = useState<SchemistColor>(schemistColor);

    useEffect(() => {
        if (value) {
            const [colorFormat, schemistColor] = parseColor(value);
            if (!schemistColor) return;
            if (!colorFormat) return;

            setLocalValue(schemistColor);
        }
    }, [value]);

    const handleChange = (newValue: SchemistColor) => {
        setLocalValue(newValue);
        onChange(formatSchemistToHex(newValue));
    };

    return (
        <div className="col-span-full min-h-72">
            <fieldset>
                <TabGroup>
                    <TabList className="flex flex-row gap-2 mb-2 text-lg text-zinc-950">
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">RGB</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">HSL</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">LCH</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">CSS</Tab>
                        <Tab className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Tailwind</Tab>
                    </TabList>
                    <TabPanels className="p-2">
                        <TabPanel>
                            <RGBColorField
                                value={localValue}
                                onChange={handleChange}
                            />
                        </TabPanel>
                        <TabPanel>
                            <HSLColorField
                                value={localValue}
                                onChange={handleChange}
                            />
                        </TabPanel>
                        <TabPanel>
                            <LCHColorField
                                value={localValue}
                                onChange={handleChange}
                            />
                        </TabPanel>

                        <TabPanel>
                            <CSSColorField
                                value={localValue}
                                onChange={handleChange}
                                colorInputFormat={colorInputFormat}
                                onFormatChange={setColorInputFormat}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ColorPickerTailwind token={token} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </fieldset>
        </div>
    );
};

export default ColorField;