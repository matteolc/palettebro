import type { MetaFunction } from "@vercel/remix";
import { Pattern } from "~/components/Pattern";
import { ThemeSelector } from "~/components/ThemeSelector";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="hidden sm:block fixed">
        <Pattern />
      </div>

      <div className="z-50">
        <div className="flex-1 p-10 grid gap-16 sm:place-items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-6xl font-bold leading-relaxed bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-700 text-transparent bg-clip-text">🌈 Palette Bruh</h2>
              <p className="text-neutral font-light max-w-sm">
                Powered by <a href="https://culorijs.org/">Culori</a>. Inspired by <a href="https://schemist.fglt.fr/">Schemist</a> and <a href="https://huemint.com/">Huemint</a>. Check out the{" "}
                <a href="https://github.com/matteolc/palette-bruh">
                  code on Github
                </a>
                .
              </p>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </>
  );
}
