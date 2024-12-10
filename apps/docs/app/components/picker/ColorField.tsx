import React, { useState, useEffect, useRef } from 'react';
import { RGBColorField } from './RGBColorField';
import { CSSColorField } from './CSSColorField';
import { HSLColorField } from './HSLColorField';
import { LCHColorField } from './LCHColorField';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { randomUsableColor } from 'node_modules/@repo/theme-generator/src/color/manipulation';
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
    const [selectedIndex, setSelectedIndex] = useState(0)

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

    const handleRandomize = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const randomColor = randomUsableColor();
        handleChange(randomColor);
    };

    return (
        <div className="col-span-full min-h-72">
            <fieldset>
                <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <TabList className="flex flex-row gap-2 mb-2 text-lg">
                        <Tab onClick={(e) => { e.preventDefault(); setSelectedIndex(0) }} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">RGB</Tab>
                        <Tab onClick={(e) => { e.preventDefault(); setSelectedIndex(1) }} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">HSL</Tab>
                        <Tab onClick={(e) => { e.preventDefault(); setSelectedIndex(2) }} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">LCH</Tab>
                        <Tab onClick={(e) => { e.preventDefault(); setSelectedIndex(3) }} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">CSS</Tab>
                        <Tab onClick={(e) => { e.preventDefault(); setSelectedIndex(4) }} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Tailwind</Tab>
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
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 self-start"
                            type="button"
                            onClick={handleRandomize}
                        >
                            Randomize
                        </button>
                    </TabPanels>
                </TabGroup>
            </fieldset>
        </div>
    );
};

export default ColorField;