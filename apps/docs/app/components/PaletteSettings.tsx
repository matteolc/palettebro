import { RiEqualizerLine } from "@remixicon/react";
import { useContext } from "react";
import { PaletteContext } from "~/PaletteContext";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Slider } from "./ui/Slider";
import { RadioCardGroup, RadioCardIndicator, RadioCardItem } from "./ui/RadioCard";
import { ThemeVariantEnum } from "@repo/theme-generator/types";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { PaletteToolbarContext } from "../PaletteToolbarContext";
import { StaticPaletteSettings } from "./StaticPaletteSettings";

export const PaletteSettings = () => {
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
                <TabGroup defaultIndex={
                    variant === ThemeVariantEnum.spot ? 0 : 1
                }>

                    <TabList className="flex flex-row gap-2 mb-2 text-lg text-zinc-950">
                        <Tab onClick={() => setVariant?.(ThemeVariantEnum.spot)} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Static</Tab>
                        <Tab onClick={() => setVariant?.(ThemeVariantEnum.ai)} className="rounded-md px-2 py-1 outline-none data-[selected]:bg-zinc-950 data-[selected]:text-white data-[hover]:underline">Generative</Tab>
                    </TabList>
                    <TabPanels className="p-2">
                        <TabPanel>
                            <StaticPaletteSettings />
                        </TabPanel>
                        <TabPanel className="grid grid-cols-3 gap-2">
                            <div>

                                <div className="flex flex-row items-center justify-between text-zinc-950">
                                    <div className="text-lg mb-2">Temperature</div>
                                    <div className="text-lg font-bold mb-2">{temperature}</div>
                                </div>
                                <Slider value={[temperature]} min={0} step={0.1} max={2.4} onValueChange={(value: number[]) => setTemperature(value[0])} />
                                <div className="mb-4" />

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
                            <div>

                                <div className="flex flex-row items-center justify-between text-zinc-950">
                                    <div className="text-lg mb-2">Target</div>
                                </div>
                                <RadioCardGroup value={page} onValueChange={setPage} className="text-lg mb-4">
                                    {["website-magazine", "brand-2", "brand-3", "website-1"].map((page) => (
                                        <RadioCardItem value={page} className="flex items-center gap-3 py-2 text-zinc-950">
                                            <RadioCardIndicator />
                                            <span>{page}</span>
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