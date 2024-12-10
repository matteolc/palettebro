import React from 'react';
import RangeField from './RangeField';
import { LchColor, SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { lchToSchemist, schemistToLch } from 'node_modules/@repo/theme-generator/src/color/conversion';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';

interface LCHColorFieldProps {
    id: number;
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const LCHColorField: React.FC<LCHColorFieldProps> = ({ id, value, onChange }) => {
    const color = schemistToLch(value);

    const inputHandler = (channel: keyof LchColor) => (channelValue: number) => {
        const newColor = { ...color, [channel]: channelValue };
        onChange(lchToSchemist(newColor));
    };

    return (
        <>
            <RangeField
                id={`${id}-h`}
                label="Hue"
                max={360}
                unit="°"
                gradient={continuousGradient(
                    range(12).map((i) => lchToSchemist({ ...color, h: i * 30 }))
                )}
                value={color.h}
                onInput={inputHandler('h')}
            />
            <RangeField
                id={`${id}-c`}
                label="Chroma"
                gradient={continuousGradient(
                    range(10).map((i) => lchToSchemist({ ...color, c: i * 10 }))
                )}
                value={color.c}
                onInput={inputHandler('c')}
            />
            <RangeField
                id={`${id}-l`}
                label="Lightness"
                unit="%"
                gradient={continuousGradient(
                    range(10).map((i) => lchToSchemist({ ...color, l: i * 10 }))
                )}
                value={color.l}
                onInput={inputHandler('l')}
            />
        </>
    );
};

export { LCHColorField };