import { RadioCardGroup, RadioCardIndicator, RadioCardItem } from "../RadioCard";
import { useContext } from "react";
import { PaletteToolbarContext } from "~/PaletteToolbarContext";
import { Slider } from "../ui/slider";
import colors from "tailwindcss/colors";

export const DynamicPaletteSettings = () => {
    const { temperature, setTemperature, preset, setPreset, profile, setProfile, page, setPage } = useContext(PaletteToolbarContext);

    if (!temperature) return null;
    if (!setTemperature) return null;
    
    return (
        <div className="grid grid-cols-3 gap-2">
        <div>

            <div className="flex flex-row items-center justify-between text-zinc-950">
                <div className="text-lg mb-2">Temperature</div>
                <div className="text-lg font-bold mb-2">{temperature}</div>
            </div>
            <Slider style={
              {
                "--primary": `14.08% 0.0044 285.82`,
                "--primary-50": `97.5% 0.0044 285.82`
              } as React.CSSProperties
            } value={[temperature]} min={0} step={0.1} max={2.4} onValueChange={(value: number[]) => setTemperature(value[0])} />
            <div className="mb-4" />

            <div className="flex flex-row items-center justify-between text-zinc-950">
                <div className="text-lg mb-2">Profile</div>
            </div>
            <RadioCardGroup value={profile} onValueChange={setProfile} className="text-lg mb-4">
                {["transformer", "diffusion", "creative"].map((profile) => (
                    <RadioCardItem key={profile} value={profile} className="flex items-center gap-3 py-2 text-zinc-950">
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
                    <RadioCardItem key={preset} value={preset} className="flex items-center gap-3 py-2 text-zinc-950">
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
                    <RadioCardItem key={page} value={page} className="flex items-center gap-3 py-2 text-zinc-950">
                        <RadioCardIndicator />
                        <span>{page}</span>
                    </RadioCardItem>
                ))}
            </RadioCardGroup>
        </div>
    </div>
    )
}
