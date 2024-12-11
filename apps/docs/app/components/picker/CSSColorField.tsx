import React, { useState, useEffect } from 'react';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { ColorFormat, formatSchemistTo, formatSchemistToHex } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { parseColor } from 'node_modules/@repo/theme-generator/src/color/parsing';
import { Input } from '../ui/Input';

interface CSSColorFieldProps {
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
    colorInputFormat: ColorFormat;
    onFormatChange: (format: ColorFormat) => void;
}

const CSSColorField: React.FC<CSSColorFieldProps> = ({
    value,
    onChange,
    colorInputFormat,
    onFormatChange
}) => {
    const [formattedValue, setFormattedValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const formatted = formatSchemistTo(value, colorInputFormat, 0);
        if (formatSchemistToHex(value) !== formattedValue) {
            setFormattedValue(formatted);
        }
    }, [value, colorInputFormat]);

    const handleSubmit = () => {
        const [format, color] = parseColor(formattedValue);

        if (format && color) {
            onFormatChange(format);
            onChange(color);
        } else {
            setError('Invalid color format');
        }
    };

    return (
        <div className="flex flex-col gap-y-4 my-4">
            <div className="flex flex-row items-center justify-between text-zinc-950">
                <label className="text-lg mb-2" htmlFor="css-color-picker">CSS</label>
                <div className="text-lg font-bold mb-2">{formattedValue}</div>
            </div>
            <Input
                placeholder="Enter color"
                id="css-color-picker"
                name="css-color-picker"
                type="text"
                value={formattedValue}
                onChange={(e) => setFormattedValue(e.target.value.trim())}
            />
            {error && <div className="text-red-500">{error}</div>}
            <button className="px-4 py-2 bg-zinc-950 text-white rounded-md" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export { CSSColorField };