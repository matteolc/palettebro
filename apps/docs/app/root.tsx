import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import type { ReactNode } from "react";
import { getClientLocales } from 'remix-utils/locales/server';
import { getHints } from "./hooks/use-hints";
import { getTheme, useTheme } from "./hooks/use-theme";

import "~/tailwind.css";
import { getDomainUrl } from "./lib/get-domain-url";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "border-b-2 border-neutral" : "hover:border-b-2 hover:border-primary";

export async function loader({ request }: LoaderFunctionArgs) {
  const locales = getClientLocales(request);
  return {
    requestInfo: {
      hints: getHints(request),
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
      userPrefs: { theme: getTheme(request) },
    },
    locales,
  }

}

const Layout = (props: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full max-w-7xl mx-auto p-10">
        <nav>
          <ul className="flex gap-16 text-lg font-semibold">
            <li>
              <NavLink to="/" className={navLinkClass}>
                home
              </NavLink>
            </li>
            <li>
              <NavLink to="/docs/palette" className={navLinkClass}>
                palette
              </NavLink>
            </li>
            <li>
              <NavLink to="/docs/shades" className={navLinkClass}>
                shades
              </NavLink>
            </li>
            <li>
              <NavLink to="/docs/huemints" className={navLinkClass}>
                huemints
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="w-full max-w-7xl mx-auto flex-1 flex">
        {props.children}
      </main>
      <footer className="w-full max-w-7xl mx-auto p-10 flex justify-center">
        <span className="text-sm text-neutral">
          Made with ❤️ by{" "}
          <a href="https://github.com/matteolc">
            matteolc
          </a>
        </span>
      </footer>
    </div>
  )
}

export const meta: MetaFunction = () => [
  { title: "Palette Bruh" },
  {
    name: "description",
    content: "A palette generator for the web",
  },
];

export default function App() {
  const theme = useTheme();
  const lightOrDark = theme.includes("dark") ? 'dark' : 'light';

  return (
    <html lang="en" className={`${lightOrDark} h-full`} data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <LiveReload />
      </body>
    </html>
  );
}
