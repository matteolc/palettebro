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

    useEffect(() => {
        const formatted = formatSchemistTo(value, colorInputFormat, 0);
        if (formatSchemistToHex(value) !== formattedValue) {
            setFormattedValue(formatted);
        }
    }, [value, colorInputFormat]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newValue = e.target.value.trim();
        const [format, color] = parseColor(newValue);

        if (format && color) {
            onFormatChange(format);
            onChange(color);
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Invalid color');
            e.target.reportValidity();
        }
    };

    return (
        <div className="space-y-2">
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
                onChange={handleInput}
            />
        </div>
    );
};

export { CSSColorField };