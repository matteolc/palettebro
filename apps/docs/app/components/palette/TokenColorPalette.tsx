import { RiPaletteFill } from '@remixicon/react';
import { useContext } from 'react';
import { sentenceCase } from '~/lib/string';
import { PaletteContext } from '~/PaletteContext';
import { ColorPaletteShades } from './ColorPaletteShades';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const TokenColorPalette = ({ token }: { token: string }) => {
    const { palette } = useContext(PaletteContext);
    const name = palette?.[token]?.name;

    if (!name) return null;

    return (
        <Card >
            <CardHeader>
                <CardTitle>
                    <h3 className="text-xl font-bold flex items-center" style={{ color: "oklch(var(--neutral-800))" }}>
                        <RiPaletteFill className="mr-2" style={{ color: `oklch(var(--${token}))` }} /> {sentenceCase(token)} Palette
                    </h3>
                </CardTitle>
            </CardHeader>


            <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2 grid grid-cols-3 gap-2">
                    <div style={{ backgroundColor: `oklch(var(--${token}-light))`, color: `oklch(var(--${token}-text))` }} className="p-4 rounded justify-center text-white items-center flex">
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xl font-bold">Light</div>
                            <div>{palette?.[`${token}-light`].name}</div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: `oklch(var(--${token}))`, color: `oklch(var(--${token}-text))` }} className={`p-4 rounded justify-center text-white items-center flex`}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xl font-bold">Base</div>
                            <div>{palette?.[`${token}`].name}</div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: `oklch(var(--${token}-dark))`, color: `oklch(var(--${token}-text))` }} className={`p-4 rounded justify-center text-white items-center flex`}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xl font-bold">Dark</div>
                            <div>{palette?.[`${token}-dark`].name}</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 grid grid-cols-1 gap-2">
                    <div style={{ backgroundColor: `oklch(var(--${token}-container))`, color: `oklch(var(--on-${token}-container))` }} className={`p-4 rounded text-center`}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xl font-bold">Container</div>
                            <div>{palette?.[`${token}-container`].name}</div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: `oklch(var(--on-${token}-container))`, color: `oklch(var(--${token}-container))` }} className={`p-4 rounded text-center`}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-xl font-bold">On Container</div>
                            <div>{palette?.[`on-${token}-container`].name}</div>
                        </div>
                    </div>
                </div>
                </div>
                <ColorPaletteShades colors={[token]} />
            </CardContent>
        </Card>
    );
};

export { TokenColorPalette };