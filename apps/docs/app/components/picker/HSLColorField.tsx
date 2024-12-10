import React, { useEffect } from 'react';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { hslToSchemist, schemistToHsl } from 'node_modules/@repo/theme-generator/src/color/conversion';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import { Slider } from '../ui/Slider';

interface HSLColorFieldProps {
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const HSLColorField: React.FC<HSLColorFieldProps> = ({ value, onChange }) => {
    const color = schemistToHsl(value);
    const [h, setH] = React.useState(color.h);
    const [s, setS] = React.useState(color.s);
    const [l, setL] = React.useState(color.l);

    useEffect(() => {
        onChange(hslToSchemist({ h, s, l }));
    }, [h, s, l]);

    return (
        <div className="flex flex-col gap-y-4 my-4">
            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Hue</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(h)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(12).map((i) =>
                            hslToSchemist({ ...color, h: i * 30 })
                        )
                    )
                }} max={360} value={[h]} onValueChange={(value: number[]) => setH(value[0])} />
            </div>

            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Saturation</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(s)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(10).map((i) =>
                            hslToSchemist({ ...color, s: i * 10 })
                        )
                    )
                }} max={100} value={[s]} onValueChange={(value: number[]) => setS(value[0])} />
            </div>


            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Lightness</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(l)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(10).map((i) =>
                            hslToSchemist({ ...color, l: i * 10 })
                        )
                    )
                }} max={100} value={[l]} onValueChange={(value: number[]) => setL(value[0])} />
            </div>
        </div>
    );
};

export { HSLColorField };