import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/remix';
import type { LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import { getClientLocales } from 'remix-utils/locales/server';
import { getHints } from './hooks/use-hints';

import '~/tailwind.css';
import { getDomainUrl } from './lib/get-domain-url';

export const meta: MetaFunction = () => {
  const title = "Palette Bruh - The Best Color Palette Generator";
  const description = "Create infinite palettes, save favorites, preview with real components, and export as CSS variables. The most powerful color palette generator for web projects.";
  
  return [
    { title },
    { name: "description", content: description },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:type", content: "website" },
    { name: "og:site_name", content: "Palette Bruh" },
    { property: "og:image", content: "/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "/og-image.jpg" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locales = getClientLocales(request);
  return {
    requestInfo: {
      hints: getHints(request),
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
    locales,
  };
}

export default function App() {
  return (
    <html lang="en" className="h-full min-h-fit">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-fit antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
