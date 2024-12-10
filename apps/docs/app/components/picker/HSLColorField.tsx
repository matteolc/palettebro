// HSLColorField.tsx
import React from 'react';
import RangeField from './RangeField';
import { HslColor, SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { hslToSchemist, schemistToHsl } from 'node_modules/@repo/theme-generator/src/color/conversion';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';

interface HSLColorFieldProps {
    id: number;
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const HSLColorField: React.FC<HSLColorFieldProps> = ({ id, value, onChange }) => {
    const color = schemistToHsl(value);

    const inputHandler = (channel: keyof HslColor) => (channelValue: number) => {
        const newColor = { ...color, [channel]: channelValue };
        onChange(hslToSchemist(newColor));
    };

    return (
        <>
            <RangeField
                id={`${id}-h`}
                label="Hue"
                max={360}
                unit="°"
                gradient={continuousGradient(
                    range(12).map((i) => hslToSchemist({ ...color, h: i * 30 }))
                )}
                value={color.h}
                onInput={inputHandler('h')}
            />
            <RangeField
                id={`${id}-s`}
                label="Saturation"
                unit="%"
                gradient={continuousGradient(
                    range(10).map((i) => hslToSchemist({ ...color, s: i * 10 }))
                )}
                value={color.s}
                onInput={inputHandler('s')}
            />
            <RangeField
                id={`${id}-l`}
                label="Lightness"
                unit="%"
                gradient={continuousGradient(
                    range(10).map((i) => hslToSchemist({ ...color, l: i * 10 }))
                )}
                value={color.l}
                onInput={inputHandler('l')}
            />
        </>
    );
};

export { HSLColorField };