import { useContext } from 'react';
import { PaletteContext } from '~/PaletteContext';
import ralColors from './ral.json';

export const RALColorField = ({ token }: { token: string }) => {
    const { setBaseColors } = useContext(PaletteContext);

    const handleColorClick = (hex: string) => {
        setBaseColors?.({ [token]: hex } as any);
    };

    return (
        <div className="grid grid-cols-4 gap-4 my-4">
            {Object.keys(ralColors).map((key: string) => (
                <button
                    key={key}
                    onClick={() => handleColorClick(ralColors[key as keyof typeof ralColors].hex)}
                    className="group relative flex flex-col h-24 rounded-lg overflow-hidden "
                >
                    <div
                        className="h-full w-full"
                        style={{ backgroundColor: ralColors[key as keyof typeof ralColors].hex }}
                    />
                    <div className="absolute text-zinc-950 bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
                        <div className="text-xs font-bold">{key}</div>
                        <div className="text-xs truncate">{ralColors[key as keyof typeof ralColors].name}</div>
                    </div>
                </button>
            ))}
        </div>
    );
};