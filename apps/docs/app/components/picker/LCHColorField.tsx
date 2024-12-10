import React, { useEffect } from 'react';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { lchToSchemist, schemistToLch } from 'node_modules/@repo/theme-generator/src/color/conversion';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import { Slider } from '../ui/Slider';


interface LCHColorFieldProps {
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const LCHColorField: React.FC<LCHColorFieldProps> = ({ value, onChange }) => {
    const color = schemistToLch(value);
    const [h, setH] = React.useState(color.h);
    const [c, setC] = React.useState(color.c);
    const [l, setL] = React.useState(color.l);

    useEffect(() => {
        onChange(lchToSchemist({ h, c, l }));
    }, [h, c, l]);

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
                            lchToSchemist({ ...color, h: i * 30 })
                        )
                    )
                }} max={360} value={[h]} onValueChange={(value: number[]) => setH(value[0])} />
            </div>

            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Chroma</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(c)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(10).map((i) =>
                            lchToSchemist({ ...color, c: i * 10 })
                        )
                    )
                }} max={100} value={[c]} onValueChange={(value: number[]) => setC(value[0])} />
            </div>


            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Lightness</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(l)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(10).map((i) =>
                            lchToSchemist({ ...color, l: i * 10 })
                        )
                    )
                }} max={100} value={[l]} onValueChange={(value: number[]) => setL(value[0])} />
            </div>
        </div>
    );
};

export { LCHColorField };