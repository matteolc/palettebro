import { RiMagicLine, RiSunLine, RiMoonLine, RiInformationLine, RiInformationOffLine, RiHeart2Line, RiHeartLine } from "@remixicon/react";
import { useContext, useEffect, useState } from "react";
import { BaseColors, PaletteContext } from "~/PaletteContext";
import { ThemeVariantEnum } from "@repo/theme-generator/types";
import { Form, useFetcher, useRevalidator } from "@remix-run/react";
import { action } from "~/routes/generate";
import { PaletteToolbarContext } from "../../PaletteToolbarContext";
import { ColorSwatch } from "./ColorSwatch";
import { PaletteSettings } from "./PaletteSettings";
import { randomUsableColor } from "node_modules/@repo/theme-generator/src/color/manipulation";
import { formatSchemistToHex } from "node_modules/@repo/theme-generator/src/color/formatting";
import { PaletteSwatches } from "./PaletteSwatches";
import { action as favouritesAction } from "~/routes/favourites";

const BASE_TOKENS = ["primary", "secondary", "accent", "neutral"];
const STATUS_TOKENS = ["info", "success", "warning", "error"];

const PaletteToolbar = () => {
    const { setIsDark, isDark, setBaseColors, variant, palette } = useContext(PaletteContext);
    const { temperature, profile, preset, adjacency, page, numColors } = useContext(PaletteToolbarContext);
    const [generatedPalettes, setGeneratedPalettes] = useState<{ palette: string[] }[] | undefined>([]);
    const fetcher = useFetcher<typeof action>({ key: "generate-palette" });
    const favouritesFetcher = useFetcher<typeof favouritesAction>({ key: "favourites" });

    useEffect(() => {
        document.addEventListener("click", downloadObjectAsJson);
        return () => document.removeEventListener("click", downloadObjectAsJson);
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
        if (fetcher?.data?.results && generatedPalettes?.length === 0)
            setGeneratedPalettes(fetcher.data.results);
    }, [fetcher.data])

    useEffect(() => {
        const result = generatedPalettes?.[0];
        if (!result) return;

        const palette = result.palette;
        setBaseColors?.({ primary: palette[0], secondary: palette[1], accent: palette[2] });
    }, [generatedPalettes])

    useEffect(() => setGeneratedPalettes([]), [temperature, profile, preset, page])

    const popPalette = () => setGeneratedPalettes(generatedPalettes?.slice(1));

    const resetGeneratedPalettes = () => setGeneratedPalettes([]);

    const handleRandomize = () => setBaseColors?.({ 'primary': formatSchemistToHex(randomUsableColor()) } as BaseColors);

    const shouldSubmit = generatedPalettes?.length === 0;

    return (
        <div className="fixed bottom-0 left-0 md:mb-4 right-0 flex justify-center z-50">
            <div
                style={{ borderColor: `oklch(var(--neutral-100))` }}
                className="items-center gap-2 rounded-lg border px-2 py-1 hidden md:flex bg-white/80 backdrop-blur-md shadow-lg">
                <div className="flex items-center justify-center text-zinc-900">
                    <Form noValidate fetcherKey="generate-palette" navigate={false} action="/generate" method="POST">

                        <input type="text" readOnly className="hidden" value={profile} name="mode" />
                        <input type="text" readOnly className="hidden" value={preset} name="preset" />
                        <input type="text" readOnly className="hidden" value={numColors} name="colors" />
                        <input type="text" readOnly className="hidden" value={temperature} name="temperature" />
                        <input type="text" readOnly className="hidden" value={adjacency} name="adjacency" />
                        <input type="text" readOnly className="hidden" value={page} name="page" />

                        {variant === ThemeVariantEnum.dynamic ?
                            <button className="px-1 py-2" type={shouldSubmit ? "submit" : "button"} onClick={popPalette}>
                                <RiMagicLine className={variant !== ThemeVariantEnum.dynamic ? "text-gray-400" : ""} />
                            </button> :
                            <button className="px-1 py-2" type="button" onClick={handleRandomize}>
                                <RiMagicLine />
                            </button>
                        }
                    </Form>

                    <PaletteSettings />

                    <Form noValidate fetcherKey="favourites" navigate={false} action="/favourites" method="POST">
                        <input type="text" readOnly className="hidden" value={palette?.['primary'].name} name="name" />
                        <input type="text" readOnly className="hidden" value={palette?.['primary'].color} name="primary" />
                        <input type="text" readOnly className="hidden" value={palette?.['secondary'].color} name="secondary" />
                        <input type="text" readOnly className="hidden" value={palette?.['accent'].color} name="accent" />
                        <button type="submit" className="pl-1 pr-2.5 py-2">
                            <RiHeartLine />
                        </button>
                    </Form>

                    <PaletteSwatches onLockUnlock={resetGeneratedPalettes} />

                    <button type="button" className="pl-1 pr-2.5 py-2" onClick={() => setIsDark?.(!isDark)}>
                        {isDark ? <RiMoonLine /> : <RiSunLine />}
                    </button>
                </div>
            </div>
        </div >
    )
}

export { PaletteToolbar, BASE_TOKENS, STATUS_TOKENS };
