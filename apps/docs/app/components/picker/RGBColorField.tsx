// RGBColorField.tsx
import React from 'react';

import RangeField from './RangeField';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { rgbToSchemist, schemistToRgb } from 'node_modules/@repo/theme-generator/src/color/conversion';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';

interface RGBColorFieldProps {
    id: number;
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const RGBColorField: React.FC<RGBColorFieldProps> = ({
    id,
    value,
    onChange
}) => {
    const color = schemistToRgb(value);

    const inputHandler = (channel: 'r' | 'g' | 'b') => (channelValue: number) => {
        onChange(rgbToSchemist({
            ...color,
            [channel]: channelValue
        }));
    };

    return (
        <>
            <RangeField
                id={`${id}-r`}
                label="Red"
                max={255}
                gradient={continuousGradient(
                    range(8).map((i) =>
                        rgbToSchemist({ ...color, r: Math.floor(i * 32) })
                    )
                )}
                value={color.r}
                onInput={inputHandler('r')}
            />
            <RangeField
                id={`${id}-g`}
                label="Green"
                max={255}
                gradient={continuousGradient(
                    range(8).map((i) =>
                        rgbToSchemist({ ...color, g: Math.floor(i * 32) })
                    )
                )}
                value={color.g}
                onInput={inputHandler('g')}
            />
            <RangeField
                id={`${id}-b`}
                label="Blue"
                max={255}
                gradient={continuousGradient(
                    range(8).map((i) =>
                        rgbToSchemist({ ...color, b: Math.floor(i * 32) })
                    )
                )}
                value={color.b}
                onInput={inputHandler('b')}
            />
        </>
    );
};

export { RGBColorField };