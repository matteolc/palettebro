import { RiMagicLine, RiSunLine, RiFileDownloadLine, RiLockUnlockLine, RiMoonLine, RiPaletteLine, RiLockLine, RiEqualizerLine } from "@remixicon/react";
import { useContext, useState } from "react";
import { PaletteContext } from "~/PaletteContext";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { ColorPickerTailwind } from "./ColorPickerTailwind";
import { sentenceCase } from "~/lib/string";

const ColorSwatch = ({ color, name }: { color: string, name: string | undefined }) => {
    const [isLocked, setIsLocked] = useState(false);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    style={{ backgroundColor: `oklch(var(--${color}))`, color: `oklch(var(--on-${color}))`, borderColor: `oklch(var(--${color}-700))` }}
                    className={`min-w-48 px-2.5 py-1.5 rounded-lg border`}>
                    <div className="flex flex-row items-stretch justify-between">
                        <div className="flex flex-col items-start">
                            <span className="text-md font-bold">{sentenceCase(color)}</span>
                            <span className="text-xs" style={{ color: `oklch(var(--${color}-200))` }}>{name}</span>
                        </div>
                        <div className="flex flex-row items-center gap-0.5">
                            <button className="py-2 rounded-full" onClick={() => setIsLocked(!isLocked)}>
                                {isLocked ? <RiLockLine /> : <RiLockUnlockLine />}
                            </button>
                        </div>
                    </div>
                </button>
            </PopoverTrigger>

            <PopoverContent className="p-4 z-50">
                <ColorPickerTailwind />
            </PopoverContent>
        </Popover>
    )
}

const PaletteToolbar = () => {
    const { palette, setLightOrDark, isDark } = useContext(PaletteContext);

    return (
        <>
            <div className="fixed bottom-0 left-0 md:mb-4 right-0 flex justify-center z-10">
                <div style={{
                    borderColor:
                        `oklch(var(--neutral-100))`
                }} className="items-center gap-2 rounded-lg border px-2 py-1 hidden md:flex bg-white/80 backdrop-blur-md shadow-lg">
                    <div className="flex items-center justify-center text-zinc-900">
                        <button className="px-1 py-2 rounded-full">
                            <RiMagicLine />
                        </button>
                        <button className="px-1 py-2 rounded-full">
                            <RiPaletteLine />
                        </button>
                        <div className="mx-4 flex flex-row gap-1">
                            {["neutral", "primary", "secondary", "accent"].map((color) => (
                                <ColorSwatch color={color} name={palette?.[color]?.name} key={color} />
                            ))}
                        </div>
                        <button className="p-2 rounded-full" onClick={() => setLightOrDark?.(!isDark)}>
                            {isDark ? <RiMoonLine /> : <RiSunLine />}
                        </button>
                        <div className="shrink-0 w-[1px] h-8 my-auto bg-[oklch(var(--neutral))]" />
                        <button className="p-2 rounded-full">
                            <RiFileDownloadLine />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { PaletteToolbar };