import { useContext } from "react";
import { PaletteContext } from "~/PaletteContext";
import { RadioCardGroup, RadioCardIndicator, RadioCardItem } from "../RadioCard";
import { Checkbox } from "~/components/ui/checkbox";

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
                <Checkbox checked={reverse} onCheckedChange={setReverse} style={
              {
                "--primary": `14.08% 0.0044 285.82`,
                "--on-primary": `100% 0 0`,
              } as React.CSSProperties
            }  className="size-5"/>
            </div>
        </>
    )
}