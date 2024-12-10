import { useContext } from 'react';
import { PaletteContext } from '~/PaletteContext';
import colors from "tailwindcss/colors";

const tailwindColors = [
    "slate",
    "gray",
    "zinc",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
]

export const ColorPickerTailwind = ({ token }: { token: string }) => {
    const { setBaseColors } = useContext(PaletteContext);


    const handleColorClick = (color: string) => {
        setBaseColors?.({ [token]: color } as any);
    };

    return (
        <div className="flex gap-4 flex-col max-w-sm">
            <div className="flex gap-2">
                <div className='grid grid-cols-6 gap-2 max-w-sm'>
                    {tailwindColors.map(color => (
                        <div
                            style={{ backgroundColor: colors[color as keyof typeof colors][500], borderColor: colors[color as keyof typeof colors][600] }}
                            key={color}
                            className={`border size-6 rounded-full cursor-pointer`}
                            onClick={(e) => { e.preventDefault(); handleColorClick(colors[color as keyof typeof colors][500]) }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};