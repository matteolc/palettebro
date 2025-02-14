import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { getClientLocales } from 'remix-utils/locales/server';
import { getHints } from './hooks/use-hints';

import '~/tailwind.css';
import { getDomainUrl } from './lib/get-domain-url';
import type { Route } from './+types/root';

export const meta: MetaFunction = () => {
  const title = 'Palettebro - The Best Color Palette Generator';
  const description =
    'Create infinite palettes, save favorites, preview with real components, and export as CSS variables. The most powerful color palette generator for web projects.';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:type', content: 'website' },
    { name: 'og:site_name', content: 'Palette Bruh' },
    { property: 'og:image', content: '/og-image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: '/og-image.jpg' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charSet: 'utf-8' },
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full min-h-fit">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-fit antialiased">
        {/* <Analytics /> */}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
