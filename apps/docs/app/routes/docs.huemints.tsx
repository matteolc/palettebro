import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { themes } from "@repo/tailwind-theme/themes";
import { CustomColorPaletteContainer } from "@repo/ui/Palette";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    const theme = themes.cyan;
    const baseColor = theme.baseColors.primary;
    const mode: "diffusion" | "transformer" = "diffusion" as "diffusion" | "transformer";
    const colors = 4 // max 12, min 2
    const temperature = 1.2 // max 2.4, min 0
    const num_results = mode === "transformer" ? 50 : 5
    const cfg = {
        mode,
        num_colors: colors,
        temperature,
        num_results,
        adjacency: ["0", "65", "45", "35", "65", "0", "35", "65", "45", "35", "0", "35", "35", "65", "35", "0"], // nxn adjacency matrix as a flat array of strings
        palette: ["#ffffff", baseColor, "-", "-"], // locked colors as hex codes, or '-' if blank
    }
    const data = await fetch("https://api.huemint.com/color", {
        method: 'POST',
        body: JSON.stringify(cfg),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const huemints = await data.json()

    return {
        huemints: huemints.results,
        mode,
        temperature,
        baseColor,
    }

}

export default function Index() {

    const { huemints, mode, temperature, baseColor } = useLoaderData<typeof loader>();

    useEffect(() => {
        document.addEventListener("click", downloadObjectAsJson);
        return () => {
            document.removeEventListener("click", downloadObjectAsJson);
        }
    }, [])

    function downloadObjectAsJson(e: MouseEvent) {
        if (e.altKey) {
            const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(huemints))}`;
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            const name = `huemints-${baseColor}-${mode}-temp@${temperature}-${Date.now()}`;
            downloadAnchorNode.setAttribute("download", `${name}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }
    }

    return (
        <div className="flex flex-col gap-y-4 items-start">
            <div className="grid grid-cols-3 gap-x-20">
                {huemints?.map((huemint: { palette: string[], score: number }) => (
                    < CustomColorPaletteContainer key={huemint.palette.join()} colors={huemint.palette.slice(1)} />
                ))}
            </div>

        </div>
    );
}
