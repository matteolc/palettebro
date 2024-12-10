import { RiMagicLine, RiSunLine, RiLockUnlockLine, RiMoonLine, RiPaletteLine, RiLockLine, RiEqualizerLine, RiContrastDrop2Fill, RiInformationLine, RiInformationOffLine } from "@remixicon/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { PaletteContext, VariantMap } from "~/PaletteContext";
import { Checkbox, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ColorPickerTailwind } from "./picker/ColorPickerTailwind";
import { sentenceCase } from "~/lib/string";
import { Slider } from "./ui/Slider";
import { RadioCardGroup, RadioCardIndicator, RadioCardItem } from "./ui/RadioCard";
import { ThemeVariantEnum } from "@repo/theme-generator/types";
import { Form, useFetcher } from "@remix-run/react";
import { action } from "~/routes/generate";
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { PaletteToolbarContext, PaletteToolbarProvider } from "../PaletteToolbarContext";
import clsx from "clsx";
import ColorField from "./picker/ColorField";

const BASE_TOKENS = ["primary", "secondary", "accent", "neutral"];
const STATUS_TOKENS = ["info", "success", "warning", "error"];

const ColorShadesCompact = ({ token }: { token: string }) => {
    const { palette } = useContext(PaletteContext);

    if (!palette)
        return null;

    return (
        <div className="flex flex-row items-center gap-1">
            {Array.from(Array(10).keys()).map((shade) => (
                <div key={shade} style={{ backgroundColor: `oklch(var(--${token}-${shade}00))` }} className="w-4 h-4 rounded-full" />
            ))}
        </div>
    )
}

const ColorShades = ({ token }: { token: string }) => {

    const { palette } = useContext(PaletteContext);
    if (!palette) return null;

    return (
        <div key={token} className="2xl:contents">
            <div className="flex flex-col gap-y-0.5">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((variant) => {
                    const textVariant = variant > 400 ? 50 : 950;
                    const borderVariant = variant > 500 ? 950 : 50;
                    return (
                        <div key={`${token}-${variant}`} className="relative rounded-md sm:w-full ring-1 ring-inset" style={{ "--tw-ring-color": `oklch(var(--${token}-${borderVariant})/10)` } as React.CSSProperties}>
                            <div
                                className="rounded-[inherit] border-b border-[0.5px] p-2 leading-tight text-xs"
                                style={{ backgroundColor: `oklch(var(--${token}-${variant}))`, color: `oklch(var(--${token}-${textVariant}))`, borderColor: `oklch(var(--${token}-${borderVariant}))` }}
                            >
                                <div className="flex items-start flex-col justify-between">
                                    <div className="text-2xl font-bold">{variant}</div>
                                    <div>{palette[`${token}-${variant}`]?.name}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}


const ColorSwatch = ({ token, onLockUnlock }: { token: string, onLockUnlock: () => void }) => {
    const [isLocked, setIsLocked] = useState(false);
    const { palette } = useContext(PaletteContext);

    if (!palette)
        return null;

    const name = palette[token].name;

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

    return (
        <Popover>
            <PopoverButton className="outline-none">
                <button
                    style={{ backgroundColor: `oklch(var(--${token}))`, color: `oklch(var(--on-${token}))` }}
                    className={clsx(classes, `min-w-48 px-2.5 py-1.5 rounded-lg border`)}>
                    <div className="flex flex-row items-stretch justify-between">
                        <div className="flex flex-col items-start">
                            <input type="text" className="hidden" defaultValue={isLocked ? palette[token].color : ""} name={token} />
                            <span className="text-md font-bold">{sentenceCase(token)}</span>
                            <span className="text-xs" style={{ color: `oklch(var(--${token}-200))` }}>{name}</span>
                        </div>
                        <div className="flex flex-row items-center gap-0.5">
                            <Popover>
                                <PopoverButton className="outline-none py-2 rounded-full">
                                    <RiPaletteLine />
                                </PopoverButton>
                                <PopoverPanel anchor={{ to: 'top', gap: "18px" }} className="flex flex-col bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">

                                    <ColorField
                                        token={token}
                                        value={palette[token].color}
                                        onChange={(value) => console.log(value)}
                                    />
                                </PopoverPanel>
                            </Popover>
                            <Popover>
                                <PopoverButton className="outline-none py-2 rounded-full" onClick={() => { setIsLocked(!isLocked); onLockUnlock() }}>
                                    {isLocked ? <RiLockLine /> : <RiLockUnlockLine />}
                                </PopoverButton>
                            </Popover>
                        </div>
                    </div>
                </button>
            </PopoverButton>

            <PopoverPanel anchor={{ to: 'top', gap: "12px" }} className="w-48 flex flex-col bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">
                <ColorShades token={token} />
            </PopoverPanel>
        </Popover>
    )
}

const StaticPaletteSettings = () => {
    const { variant, setVariant, preset, setPreset, reverse, setReverse } = useContext(PaletteContext);

    return (
        <>
            <div className="flex flex-row items-center justify-between text-zinc-950">
                <div className="text-lg mb-2">Preset</div>
            </div>
            <RadioCardGroup value={preset} onValueChange={setPreset} className="text-lg mb-4">
                {['split-complementary', 'tetrad', 'triad'].map((preset) => (
                    <RadioCardItem value={preset} className="flex items-center gap-3 py-2 text-zinc-950">
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

const PaletteSettings = () => {
    const { variant, setVariant } = useContext(PaletteContext);
    const { temperature, setTemperature, preset, setPreset, profile, setProfile, page, setPage } = useContext(PaletteToolbarContext);

    if (!temperature) return null;
    if (!setTemperature) return null;

    return (
        <Popover className="relative z-50">
            <PopoverButton className="outline-none">
                <button className="px-1 py-2 rounded-full">
                    <RiEqualizerLine />
                </button>
            </PopoverButton>
            <PopoverPanel anchor={{ to: 'bottom start', gap: "18px" }} className="min-h-[32rem] bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">
                <TabGroup>

                    <TabList className="flex flex-row gap-2 mb-2 text-lg">
                        <Tab onClick={() => setVariant?.(ThemeVariantEnum.spot)} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Static</Tab>
                        <Tab onClick={() => setVariant?.(ThemeVariantEnum.ai)} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Generative</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <StaticPaletteSettings />
                        </TabPanel>
                        <TabPanel className="grid grid-cols-3 gap-2">
                            <div>

                                <div className="flex flex-row items-center justify-between text-zinc-950">
                                    <div className="text-lg mb-2">Profile</div>
                                </div>
                                <RadioCardGroup value={profile} onValueChange={setProfile} className="text-lg mb-4">
                                    {["transformer", "diffusion", "creative"].map((profile) => (
                                        <RadioCardItem value={profile} className="flex items-center gap-3 py-2 text-zinc-950">
                                            <RadioCardIndicator />
                                            <span>{profile}</span>
                                        </RadioCardItem>
                                    ))}
                                </RadioCardGroup>
                            </div>
                            <div>

                                <div className="flex flex-row items-center justify-between text-zinc-950">
                                    <div className="text-lg mb-2">Page</div>
                                </div>
                                <RadioCardGroup value={page} onValueChange={setPage} className="text-lg mb-4">
                                    {["website-magazine", "brand-2", "brand-3", "website-1"].map((page) => (
                                        <RadioCardItem value={page} className="flex items-center gap-3 py-2 text-zinc-950">
                                            <RadioCardIndicator />
                                            <span>{page}</span>
                                        </RadioCardItem>
                                    ))}
                                </RadioCardGroup>

                                <div className="flex flex-row items-center justify-between text-zinc-950">
                                    <div className="text-lg mb-2">Temperature</div>
                                    <div className="text-lg font-bold mb-2">{temperature}</div>
                                </div>
                                <Slider disabled={variant !== 'ai'} value={[temperature]} min={0} step={0.1} max={2.4} onValueChange={(value: number[]) => setTemperature(value[0])} />
                            </div>
                            <div>
                                <div className="flex flex-row items-center justify-between text-zinc-950">
                                    <div className="text-lg mb-2">Preset</div>
                                </div>
                                <RadioCardGroup value={preset} onValueChange={setPreset} className="text-lg mb-4">
                                    {["default", "high-contrast", "bright-light", "pastel", "vibrant", "dark", "hyper-color"].map((preset) => (
                                        <RadioCardItem value={preset} className="flex items-center gap-3 py-2 text-zinc-950">
                                            <RadioCardIndicator />
                                            <span>{preset}</span>
                                        </RadioCardItem>
                                    ))}
                                </RadioCardGroup>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </PopoverPanel>
        </Popover>
    )
}

const SaturationSettings = () => {
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

const ContrastSettings = () => {
    const { contrast, setContrast } = useContext(PaletteContext);

    if (!contrast) return null;
    if (!setContrast) return null;

    return (
        <Popover className="relative z-50">
            <PopoverButton className="outline-none">
                <button className="px-1 py-2 rounded-full">
                    <RiContrastDrop2Fill />
                </button>
            </PopoverButton>
            <PopoverPanel anchor={{ to: 'bottom start', gap: "18px" }} className="min-w-52 flex flex-col bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md">

                <div className="flex flex-row items-center justify-between text-zinc-950">
                    <div className="text-lg mb-2">Contrast</div>
                    <div className="text-lg font-bold mb-2">{contrast}</div>
                </div>
                <Slider value={[contrast]} onValueChange={(value: number[]) => setContrast(value[0])} />
            </PopoverPanel>
        </Popover>
    )
}

const PaletteToolbar = () => {
    const { setLightOrDark, isDark, setBaseColors, variant, palette } = useContext(PaletteContext);
    const { temperature, profile, preset, adjacency, page } = useContext(PaletteToolbarContext);
    const [showStatePalette, setShowStatePalette] = useState(false);
    const fetcher = useFetcher<typeof action>({ key: "generate-palette" });
    const [generatedPalettes, setGeneratedPalettes] = useState<{ palette: string[] }[] | undefined>([]);

    useEffect(() => {
        document.addEventListener("click", downloadObjectAsJson);
        return () => {
            document.removeEventListener("click", downloadObjectAsJson);
        }
    }, [])

    function downloadObjectAsJson(e: MouseEvent) {
        if (!palette) return;
        if (e.altKey) {
            const paletteToColors = Object.entries(palette).reduce((acc, [key, value]) => {
                acc[key] = { value: value.color, type: 'color' };
                return acc;
            }, {} as Record<string, { value: string, type?: string }>);
            const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({
                colors: {
                    type: "color",
                    ...paletteToColors
                }
            }))}`;
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            const name = `palettebruh-${Date.now()}`;
            downloadAnchorNode.setAttribute("download", `${name}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }
    }

    useEffect(() => {
        if (fetcher?.data?.results && generatedPalettes?.length === 0) {
            setGeneratedPalettes(fetcher.data.results);
        }
    }, [fetcher.data])

    useEffect(() => {
        const result = generatedPalettes?.[0];
        if (!result) return;

        const palette = result.palette;
        setBaseColors?.({ primary: palette[0], secondary: palette[1], accent: palette[2] });
    }, [generatedPalettes])

    useEffect(() => {
        setGeneratedPalettes([]);
    }, [temperature, profile, preset, adjacency, page])

    useEffect(() => {
        if (preset === "high-contrast" || preset === "bright-light") {
            console.log("Setting base colors");
            setBaseColors?.({ primary: "#FFFFFF" });
        }
    }, [preset])

    const popPalette = () => {
        setGeneratedPalettes(generatedPalettes?.slice(1));
    }

    const resetGeneratedPalettes = () => {
        setGeneratedPalettes([]);
    }

    const shouldSubmit = generatedPalettes?.length === 0;

    return (
        <PopoverGroup>
            <div className="fixed bottom-0 left-0 md:mb-4 right-0 flex justify-center z-10">
                <div style={{
                    borderColor:
                        `oklch(var(--neutral-100))`
                }} className="items-center gap-2 rounded-lg border px-2 py-1 hidden md:flex bg-white/80 backdrop-blur-md shadow-lg">
                    <Form noValidate fetcherKey="generate-palette" navigate={false} action="/generate" method="POST" className="flex items-center justify-center text-zinc-900">

                        <input type="text" readOnly className="hidden" value={profile} name="mode" />
                        <input type="text" readOnly className="hidden" value={preset} name="preset" />
                        <input type="text" readOnly className="hidden" value="4" name="colors" />
                        <input type="text" readOnly className="hidden" value={temperature} name="temperature" />
                        <input type="text" readOnly className="hidden" value={adjacency} name="adjacency" />
                        <input type="text" readOnly className="hidden" value={page} name="page" />
                        <button disabled={variant !== ThemeVariantEnum.ai} className="px-1 py-2 rounded-full" type={shouldSubmit ? "submit" : "button"} onClick={popPalette}>
                            <RiMagicLine className={variant !== ThemeVariantEnum.ai ? "text-gray-400" : ""} />
                        </button>
                        <PaletteSettings />
                        {!showStatePalette && <div className="mx-4 flex flex-row gap-1">
                            {BASE_TOKENS.map((token) => (
                                <ColorSwatch token={token} key={token} onLockUnlock={resetGeneratedPalettes} />
                            ))}
                        </div>}
                        {showStatePalette && <div className="mx-4 flex flex-row gap-1">
                            {STATUS_TOKENS.map((token) => (
                                <ColorSwatch token={token} key={token} onLockUnlock={resetGeneratedPalettes} />
                            ))}
                        </div>}
                        <button type="button" className="px-1 py-2 rounded-full" onClick={() => setShowStatePalette?.(!showStatePalette)}>
                            {showStatePalette ? <RiInformationOffLine /> : <RiInformationLine />}
                        </button>
                        <SaturationSettings />
                        <button type="button" className="pl-1 pr-2.5 py-2 rounded-full" onClick={() => setLightOrDark?.(!isDark)}>
                            {isDark ? <RiMoonLine /> : <RiSunLine />}
                        </button>
                    </Form>
                </div>
            </div >
        </PopoverGroup>
    )
}

export { PaletteToolbar, BASE_TOKENS, STATUS_TOKENS };