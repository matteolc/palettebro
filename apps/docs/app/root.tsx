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

export const meta: MetaFunction = () => [
  { title: 'Palette Bruh' },
  {
    name: 'description',
    content: 'The best palette generator for the web. Ever.',
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
      <body className="bg-gradient-to-bl home-gradient min-h-fit antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
