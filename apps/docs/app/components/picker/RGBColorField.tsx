import { FC, useEffect, useState } from 'react';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { rgbToSchemist, schemistToRgb } from 'node_modules/@repo/theme-generator/src/color/conversion';
import { range } from 'node_modules/@repo/theme-generator/src/utils/generators';
import { continuousGradient } from 'node_modules/@repo/theme-generator/src/utils/css';
import { Slider } from '../ui/Slider';

interface RGBColorFieldProps {
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const RGBColorField: FC<RGBColorFieldProps> = ({
    value,
    onChange
}) => {
    const color = schemistToRgb(value);
    const [r, setR] = useState(color.r);
    const [g, setG] = useState(color.g);
    const [b, setB] = useState(color.b);

    useEffect(() => {
        onChange(rgbToSchemist({ r, g, b }));
    }, [r, g, b]);

    return (
        <div className="flex flex-col gap-y-4 my-4">
            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Red</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(r)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(8).map((i) =>
                            rgbToSchemist({ ...color, r: Math.floor(i * 32) })
                        )
                    )
                }} max={255} value={[r]} onValueChange={(value: number[]) => setR(value[0])} />
            </div>

            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Green</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(g)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(8).map((i) =>
                            rgbToSchemist({ ...color, g: Math.floor(i * 32) })
                        )
                    )
                }} max={255} value={[g]} onValueChange={(value: number[]) => setG(value[0])} />
            </div>


            <div className='flex flex-col gap-x-4'>
                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Blue</div>
                    <div className="text-lg font-bold mb-2">{Math.floor(b)}</div>
                </div>
                <Slider className="bg-gradient-to-r" rangeClassName="bg-transparent" trackStyle={{
                    background: continuousGradient(
                        range(8).map((i) =>
                            rgbToSchemist({ ...color, b: Math.floor(i * 32) })
                        )
                    )
                }} max={255} value={[b]} onValueChange={(value: number[]) => setB(value[0])} />
            </div>
        </div>
    );
};

export { RGBColorField };