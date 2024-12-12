import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { type ReactNode } from "react";
import { getClientLocales } from 'remix-utils/locales/server';
import { getHints } from "./hooks/use-hints";

import "~/tailwind.css";
import { getDomainUrl } from "./lib/get-domain-url";
import { PaletteToolbar } from "./components/PaletteToolbar";
import { PaletteProvider } from "./PaletteContext";
import { PaletteToolbarProvider } from "./PaletteToolbarContext";

export const meta: MetaFunction = () => [
  { title: "Palette Bruh" },
  {
    name: "description",
    content: "A palette generator for the web",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locales = getClientLocales(request);
  return {
    requestInfo: {
      hints: getHints(request),
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
    locales,
  }
}

const Layout = (props: { children: ReactNode }) => {

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full max-w-7xl mx-auto p-10">
        <nav>
          <ul className="flex gap-16 text-lg font-semibold items-center">
            <Link to="/">
              <h2 className="cursor-pointer title-gradient text-4xl font-bold leading-relaxed bg-gradient-to-r text-transparent bg-clip-text">🌈 Palettebruh</h2>
            </Link>
          </ul>
        </nav>
      </header>
      <main className="w-full max-w-7xl mx-auto flex-1 flex">
        <div className="p-10 prose max-w-fit">
          {props.children}
        </div>
        <PaletteToolbarProvider>
          <PaletteToolbar />
        </PaletteToolbarProvider>
      </main>
      <footer className="w-full max-w-7xl mx-auto p-10 flex justify-center">
        <span className="text-sm" style={{ color: "var(--neutral-500)" }}>
          Made with ❤️ by{" "}
          <a href="https://github.com/matteolc">
            matteolc
          </a>
        </span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PaletteProvider>
          <Layout>
            <Outlet />
          </Layout>
        </PaletteProvider>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
