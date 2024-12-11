import { useContext } from "react";
import { PaletteContext } from "~/PaletteContext";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { RiContrastDrop2Fill } from "@remixicon/react";
import { Slider } from "./ui/Slider";

export const SaturationSettings = () => {
    const { saturation, setSaturation } = useContext(PaletteContext);

    if (!saturation) return null;
    if (!setSaturation) return null;

    return (
        <Popover className="relative z-50">
            <PopoverButton className="outline-none">
                <button className="px-1 py-2 rounded-full">
                    <RiContrastDrop2Fill />
                </button>
            </PopoverButton>
            <PopoverPanel anchor={{ to: 'bottom start', gap: "18px" }} className="min-w-52 flex flex-col bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">

                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Saturation</div>
                    <div className="text-lg font-bold mb-2">{saturation}</div>
                </div>
                <Slider value={[saturation]} onValueChange={(value: number[]) => setSaturation(value[0])} />
            </PopoverPanel>
        </Popover>
    )
}