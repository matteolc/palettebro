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
        <div className="grid grid-cols-4 gap-4">
            {tailwindColors.map(color => (
                <button
                    key={color}
                    className="group relative flex flex-col h-24 rounded-lg overflow-hidden "
                    onClick={(e) => handleColorClick(colors[color as keyof typeof colors][500])}
                >

                    <div
                        className="h-full w-full"
                        style={{ backgroundColor: colors[color as keyof typeof colors][500], borderColor: colors[color as keyof typeof colors][600] }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
                        <div className="text-xs font-bold">{colors[color as keyof typeof colors][500]}</div>
                        <div className="text-xs truncate">{color}</div>
                    </div>
                </button>
            ))}
        </div>
    );
};