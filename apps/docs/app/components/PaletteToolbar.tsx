import { RiMagicLine, RiSunLine, RiMoonLine, RiInformationLine, RiInformationOffLine } from "@remixicon/react";
import { useContext, useEffect, useState } from "react";
import { BaseColors, PaletteContext } from "~/PaletteContext";
import { ThemeVariantEnum } from "@repo/theme-generator/types";
import { Form, useFetcher } from "@remix-run/react";
import { action } from "~/routes/generate";
import { Popover, PopoverButton, PopoverGroup } from '@headlessui/react'
import { PaletteToolbarContext } from "../PaletteToolbarContext";
import { ColorSwatch } from "./ColorSwatch";
import { SaturationSettings } from "./SaturationSettings";
import { PaletteSettings } from "./PaletteSettings";
import { randomUsableColor } from "node_modules/@repo/theme-generator/src/color/manipulation";
import { SchemistColor } from "node_modules/@repo/theme-generator/src/color/types";
import { formatSchemistToHex } from "node_modules/@repo/theme-generator/src/color/formatting";

const BASE_TOKENS = ["primary", "secondary", "accent", "neutral"];
const STATUS_TOKENS = ["info", "success", "warning", "error"];

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
            setBaseColors?.({ primary: "#FFFFFF" });
        }
    }, [preset])

    const popPalette = () => {
        setGeneratedPalettes(generatedPalettes?.slice(1));
    }

    const resetGeneratedPalettes = () => {
        setGeneratedPalettes([]);
    }

    const handleRandomize = (e: React.MouseEvent<HTMLButtonElement>) => {
        const randomColor = randomUsableColor();
        const color = formatSchemistToHex(randomColor)
        setBaseColors?.({ 'primary': color } as BaseColors)
    };

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
                        {variant === ThemeVariantEnum.ai ? <button className="px-1 py-2 rounded-full" type={shouldSubmit ? "submit" : "button"} onClick={popPalette}>
                            <RiMagicLine className={variant !== ThemeVariantEnum.ai ? "text-gray-400" : ""} />
                        </button> :
                            <Popover>
                                <PopoverButton className="outline-none px-1 py-2 rounded-full" onClick={handleRandomize}>
                                    <RiMagicLine />
                                </PopoverButton>
                            </Popover>}

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
