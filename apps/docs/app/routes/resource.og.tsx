import type { LoaderFunction } from '@remix-run/node';
import { generateOgImage } from '~/utils/og-image';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Palette Bruh';
  
  const svg = await generateOgImage({ title });
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}; 