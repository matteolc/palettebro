import type { ActionFunctionArgs, LoaderFunctionArgs } from '@vercel/remix';
import { z } from 'zod';
import { getGeneratorChain } from '~/lib/palette-name-generator';
import { favouritesCookie } from '~/lib/palette-store';

const paletteSchema = z.object({
  name: z.string().optional(),
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});

const schema = z.object({
  palettes: z.array(paletteSchema).optional(),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = ((await favouritesCookie.parse(cookieHeader)) ||
    {}) as z.infer<typeof schema>;
  return { palettes: cookie.palettes ?? [] };
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = ((await favouritesCookie.parse(cookieHeader)) ||
    {}) as z.infer<typeof schema>;
  const bodyParams = await request.formData();
  const parsed = paletteSchema.safeParse(Object.fromEntries(bodyParams));

  if (!parsed.success) {
    return new Response('Invalid palette', {
      headers: {
        'Set-Cookie': await favouritesCookie.serialize(cookie),
      },
    });
  }

  const { chain, parser } = getGeneratorChain();
  const { primary, secondary, accent } = parsed.data;

  const response = await chain.invoke({
    question: 'Please generate a name for this color palette.',
    format_instructions: parser.getFormatInstructions(),
    primary_color: primary,
    secondary_color: secondary,
  });

  cookie.palettes = [
    ...(cookie.palettes ?? []),
    {
      name: response.name,
      primary,
      secondary,
      accent,
    },
  ];

  return new Response('Palette added', {
    headers: {
      'Set-Cookie': await favouritesCookie.serialize(cookie),
    },
  });
}
