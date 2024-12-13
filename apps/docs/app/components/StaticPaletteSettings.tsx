import { Fragment, useContext } from "react";
import { PaletteContext } from "~/PaletteContext";
import { RadioCardGroup, RadioCardIndicator, RadioCardItem } from "./RadioCard";
import { Checkbox } from "@headlessui/react";
import clsx from "clsx";

export const StaticPaletteSettings = () => {
    const { preset, setPreset, reverse, setReverse } = useContext(PaletteContext);

    return (
        <>
            <div className="flex flex-row items-center justify-between text-zinc-950">
                <div className="text-lg mb-2">Preset</div>
            </div>
            <RadioCardGroup value={preset} onValueChange={setPreset} className="text-lg mb-4">
                {['split-complementary', 'tetrad', 'triad'].map((preset) => (
                    <RadioCardItem key={preset} value={preset} className="flex items-center gap-3 py-2 text-zinc-950">
                        <RadioCardIndicator />
                        <span>{preset}</span>
                    </RadioCardItem>
                ))}
            </RadioCardGroup>
            <div className="flex flex-row items-center justify-between text-zinc-950">
                <div className="text-lg mb-2">Reverse</div>
                <Checkbox checked={reverse} onChange={setReverse} as={Fragment}>
                    {({ checked, disabled }) => (
                        <span
                            className={clsx(
                                'block size-6 rounded border',
                                !checked && 'bg-white',
                                checked && !disabled && 'bg-blue-500',
                                checked && disabled && 'bg-gray-500',
                                disabled && 'cursor-not-allowed opacity-50'
                            )}
                        >
                            <svg className={clsx('stroke-white', checked ? 'opacity-100' : 'opacity-0')} viewBox="0 0 14 14" fill="none">
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    )}
                </Checkbox>
            </div>
        </>
    )
}