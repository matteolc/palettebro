import React, { useState, useEffect } from 'react';
import { RGBColorField } from './RGBColorField';
import { CSSColorField } from './CSSColorField';
import { HSLColorField } from './HSLColorField';
import { LCHColorField } from './LCHColorField';
import { RgbColor, SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { randomUsableColor } from 'node_modules/@repo/theme-generator/src/color/manipulation';
import { ColorFormat } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { rgbToSchemist } from 'node_modules/@repo/theme-generator/src/color/conversion';

interface ColorFieldProps {
    id: string;
    value: RgbColor;
    onChange: (value: SchemistColor) => void;
}

type InputFormat = 'css' | 'rgb' | 'hsl' | 'lch';

const ColorField: React.FC<ColorFieldProps> = ({
    id,
    value,
    onChange
}) => {
    const [format, setFormat] = useState<InputFormat>('rgb');
    const [colorInputFormat, setColorInputFormat] = useState<ColorFormat>('hex');
    const [localValue, setLocalValue] = useState<SchemistColor>(rgbToSchemist(value) || rgbToSchemist({ r: 0, g: 0, b: 0 }));

    useEffect(() => {
        if (value) {
            setLocalValue(rgbToSchemist(value));
        }
    }, [value]);

    const handleChange = (newValue: SchemistColor) => {
        setLocalValue(newValue);
        onChange(newValue);
    };

    const handleRandomize = () => {
        const randomColor = randomUsableColor();
        handleChange(randomColor);
    };

    return (
        <div className="col-span-full">
            <fieldset className="border rounded p-4">
                <div className="space-y-4">
                    <div className="grid gap-4">
                        <p id={`${id}-format`} className="input-grid-firstCol">
                            Format
                        </p>

                        <div
                            className="flex gap-2 input-grid-lastCols"
                            role="group"
                            aria-labelledby={`${id}-format`}
                        >
                            {(['rgb', 'hsl', 'lch', 'css'] as const).map((f) => (
                                <React.Fragment key={f}>
                                    <input
                                        id={`${id}-${f}`}
                                        className="hidden"
                                        type="radio"
                                        value={f}
                                        checked={format === f}
                                        onChange={(e) => setFormat(e.target.value as InputFormat)}
                                    />
                                    <label
                                        className={`px-4 py-2 rounded cursor-pointer ${format === f
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        htmlFor={`${id}-${f}`}
                                    >
                                        {f.toUpperCase()}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>

                        {format === 'css' && (
                            <CSSColorField
                                id={id}
                                value={localValue}
                                onChange={handleChange}
                                colorInputFormat={colorInputFormat}
                                onFormatChange={setColorInputFormat}
                            />
                        )}
                        {format === 'rgb' && (
                            <RGBColorField
                                id={parseInt(id)}
                                value={localValue}
                                onChange={handleChange}
                            />
                        )}
                        {format === 'hsl' && (
                            <HSLColorField
                                id={parseInt(id)}
                                value={localValue}
                                onChange={handleChange}
                            />
                        )}
                        {format === 'lch' && (
                            <LCHColorField
                                id={parseInt(id)}
                                value={localValue}
                                onChange={handleChange}
                            />
                        )}

                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 self-start"
                            type="button"
                            onClick={handleRandomize}
                        >
                            Randomize
                        </button>
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default ColorField;