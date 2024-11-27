import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { getTheme } from "~/hooks/use-theme";
import { themes } from "@repo/tailwind-theme/themes";
import { CustomColorPaletteContainer } from "@repo/ui/Palette";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};


export async function loader({ request }: LoaderFunctionArgs) {
    const themeName = getTheme(request);
    const theme = themes[themeName as keyof typeof themes];
    const baseColor = theme.baseColors.primary;
    const mode: "diffusion" | "transformer" = "transformer" as "diffusion" | "transformer";
    const colors = 4
    const temperature = 1.2
    const num_results = mode === "transformer" ? 50 : 5
    const cfg = {
        mode, // transformer, diffusion or random
        num_colors: colors, // max 12, min 2
        temperature, // max 2.4, min 0
        num_results, // max 50 for transformer, 5 for diffusion
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

    function downloadObjectAsJson(exportObj: JSON, exportName: string) {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        const name = `${exportName}-${baseColor}-${mode}-temp@${temperature}-${Date.now()}`;
        downloadAnchorNode.setAttribute("download", `${name}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    return (
        <div className="flex flex-col gap-y-4 items-start">
            <button type="button" className="text-neutral-800" onClick={() => downloadObjectAsJson(huemints, "huemints")}>Download</button>
            <div className="grid grid-cols-4 gap-x-20">
                {huemints?.map((huemint: { palette: string[], score: number }) => (
                    < CustomColorPaletteContainer key={huemint.palette.join()} colors={huemint.palette.slice(1)} />
                ))}
            </div>

        </div>
    );
}
