// CSSColorField.tsx
import React, { useState, useEffect } from 'react';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { ColorFormat, formatSchemistTo, formatSchemistToHex } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { parseColor } from 'node_modules/@repo/theme-generator/src/color/parsing';

interface CSSColorFieldProps {
    id: string;
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
    colorInputFormat: ColorFormat;
    onFormatChange: (format: ColorFormat) => void;
}

const CSSColorField: React.FC<CSSColorFieldProps> = ({
    id,
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
        <>
            <label className="input-grid-firstCol" htmlFor={`${id}-css`}>
                Value
            </label>
            <input
                id={`${id}-css`}
                className="input-grid-lastCols"
                type="text"
                value={formattedValue}
                onChange={handleInput}
            />
        </>
    );
};

export { CSSColorField };