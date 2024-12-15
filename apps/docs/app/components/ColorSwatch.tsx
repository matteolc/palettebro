import { ThemeVariantEnum } from "@repo/theme-generator/types";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useContext, useState } from "react";
import { BaseColors, PaletteContext } from "~/PaletteContext";
import { sentenceCase } from "~/lib/string";
import { RiLockLine, RiLockUnlockLine, RiPaletteLine } from "@remixicon/react";
import { ColorShades } from "./ColorShades";
import ColorField from "./picker/ColorField";
import clsx from "clsx";

export const ColorSwatch = ({ token, onLockUnlock }: { token: string, onLockUnlock?: () => void }) => {
    const [isLocked, setIsLocked] = useState(false);
    const { palette, setBaseColors, variant } = useContext(PaletteContext);

    if (!palette)
        return null;

    const name = palette[token]?.name;

    const classes = [
        // Optical border, implemented as the button background to avoid corner artifacts
        'border-transparent',
        // Button background, implemented as foreground layer to stack on top of pseudo-border layer
        'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]',
        // Drop shadow, applied to the inset `before` layer so it blends with the border
        'before:shadow',
        // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
        'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]',
        // Inner highlight shadow
        'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]',
        // White overlay on hover
        'after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]',
    ]

    const EDITABLE_TOKENS = ["primary", "secondary", "accent"];

    const shouldShowColorPicker = (variant === ThemeVariantEnum.dynamic && (EDITABLE_TOKENS.includes(token))) || token === 'primary';
    const shouldShowLock = variant === ThemeVariantEnum.dynamic && (EDITABLE_TOKENS.includes(token));

    return (
        <Popover>

            <div
                style={{ backgroundColor: `oklch(var(--${token}))`, color: `oklch(var(--on-${token}))` }}
                className={clsx(classes, `min-w-48 px-2.5 py-1.5 rounded-lg border`)}>
                <div className="flex flex-row items-stretch justify-between">
                    <PopoverButton className="outline-none">
                        <div className="flex flex-col items-start">
                            <input type="text" className="hidden" defaultValue={isLocked ? palette[token].color : ""} name={token} />
                            <span className="text-md font-bold">{sentenceCase(token)}</span>
                            <span className="text-xs">{name}</span>
                        </div>
                    </PopoverButton>
                    <div className="flex flex-row items-center gap-0.5">
                        {shouldShowColorPicker && <Popover>
                            <PopoverButton className="outline-none py-2 rounded-full">
                                <RiPaletteLine />
                            </PopoverButton>
                            <PopoverPanel anchor={{ to: 'top', gap: "18px" }} className="flex flex-col bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">

                                <ColorField
                                    token={token}
                                    value={palette[token].color}
                                    onChange={(value) => palette[token].color !== value && setBaseColors?.({ [token]: value } as BaseColors)}
                                />
                            </PopoverPanel>
                        </Popover>}
                        {shouldShowLock && <Popover>
                            <PopoverButton className="outline-none py-2 rounded-full" onClick={() => { setIsLocked(!isLocked); onLockUnlock?.() }}>
                                {isLocked ? <RiLockLine /> : <RiLockUnlockLine />}
                            </PopoverButton>
                        </Popover>}
                    </div>
                </div>
            </div>


            <PopoverPanel anchor={{ to: 'top start', gap: "16px" }} className="-ml-2.5 w-48 flex flex-col bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">
                <ColorShades token={token} />
            </PopoverPanel>
        </Popover>
    )
}